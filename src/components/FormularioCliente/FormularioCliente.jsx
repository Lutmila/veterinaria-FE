import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Box,
  CircularProgress 
} from '@mui/material';
import './FormularioCliente.css';

const FormularioCliente = ({ open, onClose, onSubmit, loading = false, clienteData = null }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: ''
  });
  
  const [errors, setErrors] = useState({});

  // Llenar el formulario si es edición
  useEffect(() => {
    if (clienteData) {
      setFormData({
        nombre: clienteData.nombre || '',
        telefono: clienteData.telefono || '',
        email: clienteData.email || ''
      });
    } else {
      setFormData({
        nombre: '',
        telefono: '',
        email: ''
      });
    }
    setErrors({});
  }, [clienteData, open]);

  // Llenar el formulario si es edición
  useEffect(() => {
    if (clienteData) {
      setFormData({
        nombre: clienteData.nombre || '',
        telefono: clienteData.telefono || '',
        email: clienteData.email || ''
      });
    } else {
      setFormData({
        nombre: '',
        telefono: '',
        email: ''
      });
    }
    setErrors({});
  }, [clienteData, open]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Limpiar formulario al cerrar
  const handleClose = () => {
    setFormData({
      nombre: '',
      telefono: '',
      email: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle>
        {clienteData ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              name="nombre"
              label="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              error={!!errors.nombre}
              helperText={errors.nombre}
              fullWidth
              required
              variant="outlined"
            />
            
            <TextField
              name="telefono"
              label="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              error={!!errors.telefono}
              helperText={errors.telefono}
              fullWidth
              required
              variant="outlined"
              type="tel"
            />
            
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
              variant="outlined"
              type="email"
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={handleClose} 
            color="secondary"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (clienteData ? 'Actualizar' : 'Crear')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormularioCliente;