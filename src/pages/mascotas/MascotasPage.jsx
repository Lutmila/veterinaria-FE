import { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Fab, Snackbar, Alert, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GenericTable from "../../components/GenericTable/GenericTable";
import FormularioMascota from "../../components/FormularioMascota/FormularioMascota";
import { useSearch } from "../../hooks/useSearch.jsx";
import './MascotasPage.css';
import { headerMascotas } from "../../utils/utils";

const MascotasPage = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingMascota, setEditingMascota] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [mascotaToDelete, setMascotaToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const apiUrl = import.meta.env.VITE_URL_BACKEND;

  const { searchTerm, filteredData: filteredMascotas, handleSearch } = useSearch(mascotas, 'nombre');

  const showNotification = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await fetch(apiUrl + '/mascotas/all');
        const data = await response.json();
        setMascotas(data);
      } catch (error) {
        console.error('Error fetching mascotas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMascotas();
  }, [apiUrl]);



  const handleOpenForm = () => {
    setEditingMascota(null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingMascota(null);
  };

  const handleSubmitForm = async (formData) => {
    setFormLoading(true);
    try {
      const isEditing = Boolean(editingMascota);
      const url = isEditing 
        ? `${apiUrl}/mascotas/${editingMascota._id}`
        : `${apiUrl}/mascotas`;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const mascotaResponse = await response.json();
        
        if (isEditing) {
          setMascotas(prevMascotas => 
            prevMascotas.map(m => 
              m._id === editingMascota._id ? mascotaResponse : m
            )
          );
          showNotification('Mascota actualizada exitosamente', 'success');
        } else {
          setMascotas(prevMascotas => [...prevMascotas, mascotaResponse]);
          showNotification('Mascota registrada exitosamente', 'success');
        }
        
        setFormOpen(false);
        setEditingMascota(null);
      } else {
        showNotification(`Error al ${isEditing ? 'actualizar' : 'crear'} la mascota`, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification(`Error al ${editingMascota ? 'actualizar' : 'crear'} la mascota`, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (mascota) => {
    console.log('Editar mascota:', mascota);
    setEditingMascota(mascota);
    setFormOpen(true);
  };

  const handleDelete = (mascota) => {
    console.log('Eliminar mascota:', mascota);
    setMascotaToDelete(mascota);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!mascotaToDelete) return;

    try {
      const response = await fetch(`${apiUrl}/mascotas/${mascotaToDelete._id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setMascotas(mascotas.filter(m => m._id !== mascotaToDelete._id));
        showNotification(`${mascotaToDelete.nombre} fue eliminada exitosamente`, 'success');
      } else {
        showNotification('Error al eliminar la mascota', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al eliminar la mascota', 'error');
    } finally {
      setDeleteModalOpen(false);
      setMascotaToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setMascotaToDelete(null);
  };

  return (
    <div className="mascotas-page">
      <div className="page-header">
        <h1>Gestión de Mascotas</h1>
        <p>Administra la información de todas las mascotas registradas en la clínica</p>
      </div>
      
      <div className="page-content">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '24px' 
        }}>
          <TextField
            variant="outlined"
            placeholder="Buscar mascota por nombre..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              width: '100%',
              maxWidth: 1200,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
              }
            }}
          />
        </div>

        <GenericTable
          data={filteredMascotas}
          headers={headerMascotas}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
          emptyMessage="No hay mascotas registradas"
          showPagination={true}
          rowsPerPageOptions={[5, 10, 25, 50]}
          defaultRowsPerPage={10}
          tableProps={{
            ariaLabel: "tabla de mascotas registradas",
            containerStyles: { maxWidth: 1200 }
          }}
        />

        <Fab
          color="primary"
          aria-label="agregar mascota"
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

      <FormularioMascota
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        loading={formLoading}
        mascotaData={editingMascota}
      />

      <Dialog
        open={deleteModalOpen}
        onClose={cancelDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
         ¿Estás seguro que deseas eliminar a la mascota?
        </DialogTitle>
        <DialogContent>
          <p>
            ¿Estás seguro que deseas eliminar a{' '}
            <strong>{mascotaToDelete?.nombre}</strong>?
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

export default MascotasPage;