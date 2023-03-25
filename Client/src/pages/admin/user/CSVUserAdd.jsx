import React, { useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

function CSVUserAdd({ csvFile, setCsvFile }) {
  const handleCsvFileSelect = (event) => {
    setCsvFile(event.target.files[0]);
  };

  useEffect(() => {
    console.log(typeof setCsvFile);
  }, []);

  return (
    <div>
      <Stack
        spacing={{ sm: 3 }}
        direction={{ lg: "row", sm: "column" }}
        sx={{ justifyContent: "space-between" }}
      >
        <Stack spacing={3} direction="row" alignItems="center">
          <Button variant="contained" component="label">
            Upload File
            <input type="file" onChange={handleCsvFileSelect} hidden />
          </Button>
          <Typography>{csvFile?.name}</Typography>
        </Stack>
      </Stack>
    </div>
  );
}

CSVUserAdd.prototype = {
  csvFile: PropTypes.string.isRequired,
  setCsvFile: PropTypes.func.isRequired,
};

export default CSVUserAdd;
