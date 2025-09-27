import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box
} from '@mui/material';
import './FormularioMascota.css';

const FormularioMascota = ({ open, onClose, onSubmit, loading, mascotaData = null }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    cliente_id: ''
  });
  const [clientes, setClientes] = useState([]);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [errors, setErrors] = useState({});
  const apiUrl = import.meta.env.VITE_URL_BACKEND;

  // Cargar clientes al abrir el formulario
  useEffect(() => {
    if (open) {
      const fetchClientes = async () => {
        setLoadingClientes(true);
        try {
          const response = await fetch(`${apiUrl}/clientes`);
          const data = await response.json();
          setClientes(data);
        } catch (error) {
          console.error('Error fetching clientes:', error);
        } finally {
          setLoadingClientes(false);
        }
      };
      fetchClientes();
    }
  }, [open, apiUrl]);

  useEffect(() => {
    if (mascotaData) {
      setFormData({
        nombre: mascotaData.nombre || '',
        especie: mascotaData.especie || '',
        raza: mascotaData.raza || '',
        edad: mascotaData.edad?.toString() || '',
        cliente_id: mascotaData.cliente_id?._id || mascotaData.cliente_id || ''
      });
    } else {
      setFormData({
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        cliente_id: ''
      });
    }
    setErrors({});
  }, [mascotaData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.especie.trim()) {
      newErrors.especie = 'La especie es obligatoria';
    }

    if (!formData.raza.trim()) {
      newErrors.raza = 'La raza es obligatoria';
    }

    if (!formData.edad) {
      newErrors.edad = 'La edad es obligatoria';
    } else if (isNaN(formData.edad) || formData.edad < 0) {
      newErrors.edad = 'La edad debe ser un número válido';
    }

    if (!formData.cliente_id) {
      newErrors.cliente_id = 'Debe seleccionar un cliente';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submitData = {
        ...formData,
        edad: parseInt(formData.edad)
      };
      onSubmit(submitData);
    }
  };

  const handleClose = () => {
    setFormData({
      nombre: '',
      especie: '',
      raza: '',
      edad: '',
      cliente_id: ''
    });
    setErrors({});
    onClose();
  };

  const isEditing = Boolean(mascotaData);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="dialog-title">
        {isEditing ? 'Editar Mascota' : 'Agregar Nueva Mascota'}
      </DialogTitle>
      
      <DialogContent className="dialog-content">
        <Box component="form" onSubmit={handleSubmit} className="form-container">
          <TextField
            name="nombre"
            label="Nombre de la mascota"
            value={formData.nombre}
            onChange={handleChange}
            error={!!errors.nombre}
            helperText={errors.nombre}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled={loading}
          />

          <TextField
            name="especie"
            label="Especie"
            value={formData.especie}
            onChange={handleChange}
            error={!!errors.especie}
            helperText={errors.especie}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled={loading}
            placeholder="Ej: Perro, Gato, Conejo..."
          />

          <TextField
            name="raza"
            label="Raza"
            value={formData.raza}
            onChange={handleChange}
            error={!!errors.raza}
            helperText={errors.raza}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled={loading}
            placeholder="Ej: Golden Retriever, Siamés..."
          />

          <TextField
            name="edad"
            label="Edad"
            type="number"
            value={formData.edad}
            onChange={handleChange}
            error={!!errors.edad}
            helperText={errors.edad}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled={loading}
          />

          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.cliente_id}
            disabled={loading || loadingClientes}
          >
            <InputLabel>Cliente</InputLabel>
            <Select
              name="cliente_id"
              value={formData.cliente_id}
              onChange={handleChange}
              label="Cliente"
            >
              {loadingClientes ? (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 2 }} />
                </MenuItem>
              ) : (
                clientes.map((cliente) => (
                  <MenuItem key={cliente._id} value={cliente._id}>
                    {cliente.nombre} - {cliente.email}
                  </MenuItem>
                ))
              )}
            </Select>
            {errors.cliente_id && (
              <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 1, ml: 2 }}>
                {errors.cliente_id}
              </Box>
            )}
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions className="dialog-actions">
        <Button onClick={handleClose} disabled={loading} color="inherit">
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormularioMascota;