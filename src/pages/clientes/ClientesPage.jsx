import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Fab,  TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import GenericTable from "../../components/GenericTable/GenericTable";
import FormularioCliente from "../../components/FormularioCliente/FormularioCliente";
import { useSearch } from "../../hooks/useSearch.jsx";
import './ClientesPage.css';
import { headerClientes } from "../../utils/utils.jsx";
import useClientes from "../../hooks/useClientes.jsx";

const ClientesPage = () => {

  const { clientes, loading, selectedClienteMascotas, setSelectedClienteMascotas, dialogOpen, setDialogOpen, selectedClienteName, setSelectedClienteName, formOpen, setFormOpen, formLoading, editingCliente, setEditingCliente, deleteModalOpen, setDeleteModalOpen, clienteToDelete, setClienteToDelete, handleSubmitForm, confirmDelete } = useClientes();
  const { searchTerm, filteredData: filteredClientes, handleSearch } = useSearch(clientes, 'nombre');

  const handleViewMascotas = (cliente) => {
    setSelectedClienteMascotas(cliente.mascotas || []);
    setSelectedClienteName(cliente.nombre);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedClienteMascotas([]);
    setSelectedClienteName('');
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setFormOpen(true);
  };

  const handleDelete = (cliente) => {
    setClienteToDelete(cliente);
    setDeleteModalOpen(true);
  };


  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setClienteToDelete(null);
  };

  const handleOpenForm = () => {
    setEditingCliente(null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingCliente(null);
  };

  return (
    <div className="clientes-page">
      <div className="page-header">
        <h1>Gestión de Clientes</h1>
        <p>Administra la información de todos los clientes registrados en la clínica</p>
      </div>
      
      <div className="page-content">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '24px' 
        }}>
          <TextField
            variant="outlined"
            placeholder="Buscar cliente por nombre..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              width: '100%',
              maxWidth: 1200,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <GenericTable
          data={filteredClientes}
          headers={headerClientes(handleViewMascotas)}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
          emptyMessage="No hay clientes registrados"
          showPagination={true}
          rowsPerPageOptions={[5, 10, 25, 50]}
          defaultRowsPerPage={10}
          tableProps={{
            ariaLabel: "tabla de clientes registrados",
            containerStyles: { maxWidth: 1200 }
          }}
        />

        <Fab
          color="primary"
          aria-label="agregar cliente"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={handleOpenForm}
        >
          <AddIcon />
        </Fab>
      </div>

      <FormularioCliente
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        loading={formLoading}
        clienteData={editingCliente}
      />

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Mascotas de {selectedClienteName}
        </DialogTitle>
        <DialogContent>
          {selectedClienteMascotas.length === 0 ? (
            <p>Este cliente no tiene mascotas registradas.</p>
          ) : (
            <List>
              {selectedClienteMascotas.map((mascota, index) => (
                <ListItem key={mascota._id || index} divider>
                  <ListItemText
                    primary={mascota.nombre}
                    secondary={
                      <span>
                        <strong>Especie:</strong> {mascota.especie} | 
                        <strong> Raza:</strong> {mascota.raza} | 
                        <strong> Edad:</strong> {mascota.edad} {mascota.edad === 1 ? 'año' : 'años'}
                      </span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteModalOpen}
        onClose={cancelDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          ¿Estás seguro que deseas eliminar al cliente?
        </DialogTitle>
        <DialogContent>
          <p>
            Estas por eliminar a {""}
            <strong>{clienteToDelete?.nombre}</strong>
          </p>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button 
            onClick={cancelDelete} 
            color="inherit" 
            variant="outlined"
            sx={{ marginRight: '8px' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            variant="contained"
            sx={{ 
              backgroundColor: '#d32f2f',
              '&:hover': { backgroundColor: '#b71c1c' }
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClientesPage;