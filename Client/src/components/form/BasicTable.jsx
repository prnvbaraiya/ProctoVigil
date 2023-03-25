import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";

function BasicTable({
  rows,
  columns,
  hideColumns,
  selectedRowIds,
  handleSelectionModelChange,
  handleDeleteRows,
  ...others
}) {
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
        components={{
          Toolbar: () => (
            <>
              <Stack direction="row" justifyContent="space-between">
                <GridToolbar />
                {selectedRowIds && selectedRowIds.length > 0 && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteRows}
                  >
                    Delete selected rows
                  </Button>
                )}
              </Stack>
            </>
          ),
        }}
        disableSelectionOnClick
        onSelectionModelChange={handleSelectionModelChange}
        {...others}
      />
    </Box>
  );
}

export default BasicTable;
