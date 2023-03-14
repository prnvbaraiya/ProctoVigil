import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";

function BasicTable({ rows, columns, hideColumns }) {
  const [pageSize, setPageSize] = useState(20);
  const [columnsState, setColumns] = useState(columns);

  const handleColumnVisibilityChange = (params) => {
    const newColumns = columnsState.map((col) =>
      col.field === params.field ? { ...col, hide: !params.isVisible } : col
    );
    setColumns(newColumns);
  };

  const visibleColumns = columnsState.filter(
    (col) => !hideColumns.includes(col.field)
  );

  return (
    <Box sx={{ width: 1 }}>
      <DataGrid
        getRowId={(row) => row._id}
        autoHeight
        rows={rows}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        columns={visibleColumns}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
}

export default BasicTable;
