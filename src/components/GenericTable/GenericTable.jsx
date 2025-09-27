import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const GenericTable = ({ 
  data = [], 
  headers = [], 
  loading = false,
  onEdit = () => {},
  onDelete = () => {},
  tableProps = {},
  showActions = true,
  emptyMessage = "No hay datos para mostrar",
  showPagination = true,
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRowsPerPage = 10
}) => {
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = showPagination 
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : data;
  
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          maxWidth: showActions ? 1200 : 1000, 
          margin: '0 auto', 
          boxShadow: 3,
          ...tableProps.containerStyles 
        }}
      >
        <Table aria-label={tableProps.ariaLabel || "tabla de datos"}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  align={header.align || 'left'}
                  sx={{ 
                    fontWeight: 'bold', 
                    fontSize: '16px',
                    ...header.headerStyles 
                  }}
                >
                  {header.label}
                </TableCell>
              ))}
              {showActions && (
                <TableCell 
                  align="center" 
                  sx={{ fontWeight: 'bold', fontSize: '16px' }}
                >
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow
                key={row._id || row.id || rowIndex}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                {headers.map((header, colIndex) => (
                  <TableCell
                    key={colIndex}
                    component={colIndex === 0 ? "th" : "td"}
                    scope={colIndex === 0 ? "row" : undefined}
                    align={header.align || 'left'}
                    sx={{ 
                      fontSize: '14px',
                      fontWeight: colIndex === 0 ? 'medium' : 'normal',
                      ...header.cellStyles 
                    }}
                  >
                    {header.render ? header.render(row[header.key], row) : row[header.key]}
                  </TableCell>
                ))}
                {showActions && (
                  <TableCell align="center" sx={{ fontSize: '14px' }}>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(row)}
                      sx={{ 
                        marginRight: 1, 
                        color: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                          color: '#1565c0'
                        }
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(row)}
                      sx={{ 
                        color: '#d32f2f',
                        '&:hover': {
                          backgroundColor: '#ffebee',
                          color: '#c62828'
                        }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {showPagination && (
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) => 
              `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
            }
            sx={{
              borderTop: '1px solid #e0e0e0',
              '& .MuiTablePagination-toolbar': {
                minHeight: '52px',
              },
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontSize: '14px',
              },
            }}
          />
        )}
      </TableContainer>
    </>
  );
};

export default GenericTable;