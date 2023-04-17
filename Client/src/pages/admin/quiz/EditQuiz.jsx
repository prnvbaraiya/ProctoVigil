import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Stack,
  Button,
  Divider,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getRandomQuestions } from "../../../common/Methods";
import {
  LoadingSpinner,
  SelectBox,
  TextBox,
  SelectChip,
  QuestionAdd,
  DateTime,
} from "../../../components/index";
import { useFormInput } from "../../../hooks/useFormInput";
import { QuizService, UserService } from "../../../services/ServerRequest";
import { questionTypes } from "../../../common/Data";

function EditQuiz() {
  const location = useLocation();
  const { id } = location.state;
  const [loading, setLoading] = React.useState(true);
  const [studentNames, setStudentNames] = useState([]);
  const author = useFormInput("");
  const name = useFormInput("");
  const description = useFormInput("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const totalDuration = useFormInput(0);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const randomQuestionSection = useFormInput("");
  const randomQuestionNumber = useFormInput("");
  const [sections, setSections] = useState([
    {
      id: uuidv4(),
      title: "Section 1",
      duration: "",
      questions: [
        {
          id: uuidv4(),
          type: questionTypes[0].value,
          question: "",
          options: [{ text: "", isCorrect: false }],
        },
      ],
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await UserService.getStudents();
      setStudentNames(
        res.data.map((item) => {
          return { title: item.username, value: item._id };
        })
      );
    };
    getData();
    setLoading(false);
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await QuizService.getById(id);
      author.onChange(
        res.data.author.firstName + " " + res.data.author.lastName
      );
      name.onChange(res.data.name);
      description.onChange(res.data.description);
      setStartDate(res.data.startDate);
      setEndDate(res.data.endDate);
      setSelectedStudents(
        res.data.studentNames.map((selectedValue) => {
          return selectedValue.username;
        })
      );
      setSections(res.data.sections);
      setLoading(false);
    };
    getData();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    setLoading(true);
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
      setEndDate(new Date(startDate).getTime());
    }
    setLoading(false);
  }, [startDate, endDate]);

  useEffect(() => {
    let tmp = 0;
    for (let section of sections) {
      tmp += Number(section.duration);
    }
    totalDuration.onChange(tmp);
  }, [sections]);

  const handleRandomQuestions = async () => {
    setLoading(true);
    const tmpQuestions = await getRandomQuestions(randomQuestionNumber.value);
    setSections((prev) => {
      const tmpPrev = [...prev];
      tmpPrev[randomQuestionSection.value - 1].questions = tmpQuestions.map(
        (item) => ({ ...item, id: uuidv4() })
      );
      tmpPrev[randomQuestionSection.value - 1].duration =
        randomQuestionNumber.value * 2;
      return tmpPrev;
    });
    randomQuestionSection.onChange("");
    randomQuestionNumber.onChange("");
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      _id: id,
      name: name.value,
      description: description.value,
      startDate: startDate,
      endDate: endDate,
      studentNames: selectedStudents.map((selectedValue) => {
        const selectedName = studentNames.find(
          (name) => name.title === selectedValue
        );
        return selectedName.value;
      }),
      sections,
    };
    const res = await QuizService.update(data);
    if (res.status === 202) {
      const state = {
        open: true,
        message: res.data,
        type: "success",
      };
      navigate("/admin/quiz", { state });
    } else {
      alert("There is Some error ", JSON.stringify(res));
    }
    setLoading(false);
  };

  const handleAddSection = () => {
    const newSection = {
      id: uuidv4(),
      title: `Section ${sections.length + 1}`,
      duration: "",
      questions: [
        {
          id: uuidv4(),
          type: questionTypes[0].value,
          question: "",
          options: [{ text: "", isCorrect: false }],
        },
      ],
    };
    setSections([...sections, newSection]);
  };

  return (
    <>
      <>
        {/*Container */}
        <Box>
          {/* Header */}
          <LoadingSpinner loading={loading} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to="..">
              <Button color="error" variant="contained">
                Cancel
              </Button>
            </Link>
            <Typography variant="h6">Update Quiz</Typography>
            <Button
              color="secondary"
              onClick={handleSubmit}
              variant="contained"
            >
              Update
            </Button>
          </Box>

          <Divider sx={{ margin: "10px" }} />

          {/* Body  */}
          <form>
            <Stack spacing={3}>
              <TextBox label="Author" disabled={true} {...author} />
              <TextBox label="Name" {...name} />
              <TextBox label="Description" {...description} />
              <Stack
                spacing={{ sm: 3 }}
                direction={{ lg: "row", sm: "column" }}
                sx={{ justifyContent: "space-between" }}
              >
                <DateTime
                  label="Start Date"
                  value={startDate}
                  setValue={setStartDate}
                />
                <DateTime
                  label="End Date"
                  value={endDate}
                  setValue={setEndDate}
                  minDate={startDate}
                />
                <TextBox
                  label="Total Duration"
                  disabled
                  fullWidth={false}
                  {...totalDuration}
                />
              </Stack>
              <SelectChip
                label="Students"
                names={studentNames}
                studentNames={selectedStudents}
                setstudentNames={setSelectedStudents}
              />
              <Stack
                spacing={{ sm: 3 }}
                direction={{ lg: "row", sm: "column" }}
                sx={{ alignItems: "center" }}
              >
                <Typography>Random Questions</Typography>
                <SelectBox
                  label="Section"
                  menuItems={sections.map((item, index) => ({
                    title: item.title,
                    value: index + 1,
                  }))}
                  fullWidth={false}
                  {...randomQuestionSection}
                />
                <TextBox
                  label="Number of Questions"
                  type="number"
                  fullWidth={false}
                  {...randomQuestionNumber}
                />
                <Button
                  variant="contained"
                  onClick={handleRandomQuestions}
                  disabled={randomQuestionNumber.value <= 0}
                >
                  Submit
                </Button>
              </Stack>
              <Button variant="contained" onClick={handleAddSection}>
                Add Section
              </Button>
              {sections.map((section, index) => (
                <Accordion
                  key={index}
                  sx={{ backgroundColor: "rgba(100, 116, 139, 0.12)" }}
                >
                  <AccordionSummary expandIcon={<KeyboardArrowUpIcon />}>
                    <Typography variant="h6">{`${section.title} (${section.questions.length} Questions)`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack>
                      <Stack direction="row" spacing={3}>
                        <TextBox
                          label={`Section ${index + 1} Title`}
                          value={section.title}
                          onChange={(e) => {
                            const updatedSections = [...sections];
                            updatedSections[index].title = e.target.value;
                            setSections(updatedSections);
                          }}
                        />
                        <TextBox
                          label={`Section ${index + 1} Duration`}
                          type="number"
                          value={section.duration}
                          onChange={(e) => {
                            const updatedSections = [...sections];
                            updatedSections[index].duration = e.target.value;
                            setSections(updatedSections);
                          }}
                        />
                      </Stack>
                      <QuestionAdd
                        questions={section.questions}
                        setQuestions={(newQuestions) => {
                          const updatedSections = [...sections];
                          updatedSections[index].questions = newQuestions;
                          setSections(updatedSections);
                        }}
                      />
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </form>
        </Box>
      </>
    </>
  );
}

export default EditQuiz;
