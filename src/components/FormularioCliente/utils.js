export const validateForm = (formData, setErrors) => {
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

export const initialValues = {
    nombre: '',
    telefono: '',
    email: ''
};