import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useFormInput } from "../../../hooks/useFormInput";
import auth from "../../../auth/auth";
import {
  QuizPointsService,
  QuizService,
  UserService,
} from "../../../services/ServerRequest";
import {
  LoadingSpinner,
  SelectBox,
  QuestionAdd,
  SelectChip,
  DateTime,
  TextBox,
} from "../../../components/index";
import { getRandomQuestions } from "../../../common/Methods";
import { questionTypes } from "../../../common/Data";

function AddQuiz() {
  const [loading, setLoading] = React.useState(false);
  const [studentNames, setStudentNames] = useState([]);
  const author = useFormInput(auth.username);
  const remainingQuizPoint = useFormInput(0);
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

  const getData = async () => {
    setLoading(true);
    const res = await UserService.getStudents();
    setStudentNames(
      res.data.map((item) => {
        return { title: item.username, value: item._id };
      })
    );
    const response = await QuizPointsService.getById(auth.id);
    remainingQuizPoint.onChange(response.data.quizPoint);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let tmp = 0;
    for (let section of sections) {
      tmp += Number(section.duration);
    }
    totalDuration.onChange(tmp);
  }, [sections]);

  useEffect(() => {
    setLoading(true);
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
      setEndDate(new Date(startDate).getTime());
    }
    setLoading(false);
  }, [startDate, endDate]);

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
      author: auth.username,
      name: name.value,
      description: description.value,
      totalDuration: totalDuration.value,
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
    const res = await QuizService.set(data);
    if (res.status === 202) {
      const state = {
        open: true,
        message: res.data,
        type: "success",
      };
      navigate("/teacher/quiz", { state });
    } else {
      alert("There is Some error ", JSON.stringify(res));
    }
    setLoading(false);
  };

  const handleAddSection = () => {
    const newSection = {
      id: uuidv4(),
      title: `Section ${sections.length + 1}`, // replace with your desired section title
      duration: "", // replace with your desired section duration
      questions: [
        {
          id: uuidv4(),
          type: questionTypes[0].value,
          question: "",
          options: [{ text: "", isCorrect: false }],
        },
      ], // an array to hold questions for this section
    };
    setSections([...sections, newSection]);
  };

  return (
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
          <Typography variant="h6">Add Quiz</Typography>
          <Button
            color="secondary"
            onClick={handleSubmit}
            disabled={remainingQuizPoint.value < 1}
            variant="contained"
          >
            Save Quiz
          </Button>
        </Box>

        <Divider sx={{ margin: "10px" }} />

        {/* Body  */}
        <form>
          <Stack spacing={3}>
            <Stack
              spacing={{ sm: 3 }}
              direction={{ lg: "row", sm: "column" }}
              sx={{ justifyContent: "space-between" }}
            >
              <TextBox label="Author" disabled={true} {...author} />
              <TextBox
                label="Remaining Quiz Point"
                disabled={true}
                {...remainingQuizPoint}
              />
            </Stack>
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
  );
}

export default AddQuiz;
