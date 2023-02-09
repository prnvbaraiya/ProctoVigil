import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout";

function Stream() {
  const [quiz, setQuiz] = React.useState("");
  const [student, setStudent] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(process.env.REACT_APP_ZCLOUD_APPID);
  }, []);

  const handleSubmit = () => {
    const data = { quiz, student };
    navigate("view", { state: data });
  };

  return (
    <AdminLayout>
      <form>
        <Card
          sx={{
            p: 2,
            gap: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quiz</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quiz}
              label="Quiz"
              onChange={(e) => setQuiz(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Student</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={student}
              label="Student"
              onChange={(e) => setStudent(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      </form>
    </AdminLayout>
  );
}

export default Stream;
