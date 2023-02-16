import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";

function BasicTable({ rows, columns, hideColumns }) {
  const [pageSize, setPageSize] = useState(20);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(() => {
    const initialState = {};
    hideColumns.forEach((field) => {
      initialState[field] = false;
    });
    return initialState;
  });

  const handleColumnVisibilityChange = (params) => {
    setColumnVisibilityModel((prev) => ({
      ...prev,
      [params.field]: params.isVisible,
    }));
  };

  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        getRowId={(row) => row._id}
        autoHeight
        rows={rows}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
}

export default BasicTable;
