export const validateForm = (formData, setErrors) => {
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


export const initialValues = {
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    cliente_id: ''
}