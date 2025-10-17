import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Box,
} from '@mui/material';
import './FormularioCliente.css';
import { validateForm } from './utils';
import { initialValues } from './utils';

const FormularioCliente = ({ open, onClose, onSubmit, loading = false, clienteData = null }) => {
  const [formData, setFormData] = useState(initialValues);
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (clienteData) {
      setFormData({
        nombre: clienteData.nombre || '',
        telefono: clienteData.telefono || '',
        email: clienteData.email || ''
      });
    } else {
      setFormData(initialValues);
    }
    setErrors({});
  }, [clienteData, open]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm(formData, setErrors)) {
      onSubmit(formData);
    }
  };

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