import { Box, Button, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TextBox, SelectBox } from "../../../components/index";
import { useFormInput } from "../../../hooks/useFormInput";
import { QuizService } from "../../../services/ServerRequest";
import { quizPhase } from "../../../common/Data";

function EditPhase() {
  const location = useLocation();
  const { id } = location.state;
  const name = useFormInput("");
  const [phase, setPhase] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const res = await QuizService.getById(id);
      name.onChange(res.data.name);
      setPhase(res.data.phase);
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    const data = {
      _id: id,
      name: name.value,
      phase,
    };
    const res = await QuizService.update(data);
    if (res.status === 202) {
      const state = {
        open: true,
        message: "Quiz Phase Updated Successfully",
        type: "success",
      };
      navigate("/admin/phase", { state });
    } else {
      alert("There is Some error ", JSON.stringify(res.data));
    }
  };

  return (
    <>
      <Box>
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
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Update
          </Button>
        </Box>

        <Divider sx={{ margin: "10px" }} />

        {/* Body  */}
        <form>
          <Stack spacing={3}>
            <TextBox label="Name" disabled {...name} />
            <SelectBox
              label="Phase"
              menuItems={quizPhase}
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
            />
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default EditPhase;
