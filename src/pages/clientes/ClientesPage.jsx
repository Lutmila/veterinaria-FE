import { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Fab, Snackbar, Alert, TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import GenericTable from "../../components/GenericTable/GenericTable";
import FormularioCliente from "../../components/FormularioCliente/FormularioCliente";
import { useSearch } from "../../hooks/useSearch.jsx";
import './ClientesPage.css';
import { headerClientes } from "../../utils/utils.jsx";

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClienteMascotas, setSelectedClienteMascotas] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedClienteName, setSelectedClienteName] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const apiUrl = import.meta.env.VITE_URL_BACKEND;

  const { searchTerm, filteredData: filteredClientes, handleSearch } = useSearch(clientes, 'nombre');

  const showNotification = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(apiUrl + '/clientes');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, [apiUrl]);


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
    console.log('Editar cliente:', cliente);
    setEditingCliente(cliente);
    setFormOpen(true);
  };

  const handleDelete = (cliente) => {
    setClienteToDelete(cliente);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!clienteToDelete) return;

    try {
      const response = await fetch(`${apiUrl}/clientes/${clienteToDelete._id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setClientes(clientes.filter(c => c._id !== clienteToDelete._id));
        showNotification(`${clienteToDelete.nombre} fue eliminado exitosamente`, 'success');
      } else {
        showNotification('Error al eliminar el cliente', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al eliminar el cliente', 'error');
    } finally {
      setDeleteModalOpen(false);
      setClienteToDelete(null);
    }
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

  const handleSubmitForm = async (formData) => {
    setFormLoading(true);
    try {
      const isEditing = Boolean(editingCliente);
      const url = isEditing 
        ? `${apiUrl}/clientes/${editingCliente._id}`
        : `${apiUrl}/clientes`;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const clienteResponse = await response.json();
        
        if (isEditing) {
          const updatedClientes = clientes.map(c => 
            c._id === editingCliente._id ? { ...clienteResponse, mascotas: c.mascotas } : c
          );
          setClientes(updatedClientes);
          showNotification('Cliente actualizado exitosamente', 'success');
        } else {
          const nuevoClienteConMascotas = { ...clienteResponse, mascotas: [] };
          const updatedClientes = [...clientes, nuevoClienteConMascotas];
          setClientes(updatedClientes);
          showNotification('Cliente registrado exitosamente', 'success');
        }
        
        setFormOpen(false);
        setEditingCliente(null);
      } else {
        showNotification(`Error al ${isEditing ? 'actualizar' : 'crear'} el cliente`, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification(`Error al ${editingCliente ? 'actualizar' : 'crear'} el cliente`, 'error');
    } finally {
      setFormLoading(false);
    }
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ClientesPage;