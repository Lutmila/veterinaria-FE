import { useEffect, useState } from "react";
import { apiUrl } from "../../../utils/constants.js";
import { useAlert } from "../../../hooks/useAlert.jsx";

export const useMascotas = () => {
    const { showAlert } = useAlert();
    const [mascotas, setMascotas] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [editingMascota, setEditingMascota] = useState(null);
    const [loadingMascotas, setLoadingMascotas] = useState(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [mascotaToDelete, setMascotaToDelete] = useState(null);

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await fetch(`${apiUrl}/mascotas/all`);
                const data = await response.json();
                setMascotas(data);
            } catch (error) {
                console.error('Error fetching mascotas:', error);
            } finally {
                setLoadingMascotas(false);
            }
        };

        fetchMascotas();
    }, []);


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
                    showAlert('Mascota actualizada exitosamente', 'success');
                } else {
                    setMascotas(prevMascotas => [...prevMascotas, mascotaResponse]);
                    showAlert('Mascota registrada exitosamente', 'success');
                }

                setFormOpen(false);
                setEditingMascota(null);
            } else {
                showAlert(`Error al ${isEditing ? 'actualizar' : 'crear'} la mascota`, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert(`Error al ${editingMascota ? 'actualizar' : 'crear'} la mascota`, 'error');
        } finally {
            setFormLoading(false);
        }
    };


    const confirmDelete = async () => {
        if (!mascotaToDelete) return;

        try {
            const response = await fetch(`${apiUrl}/mascotas/${mascotaToDelete._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMascotas(mascotas.filter(m => m._id !== mascotaToDelete._id));
                showAlert(`${mascotaToDelete.nombre} fue eliminada exitosamente`, 'success');
            } else {
                showAlert('Error al eliminar la mascota', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('Error al eliminar la mascota', 'error');
        } finally {
            setDeleteModalOpen(false);
            setMascotaToDelete(null);
        }
    };

    return { handleSubmitForm, setDeleteModalOpen, setMascotaToDelete, deleteModalOpen, confirmDelete, setFormLoading, mascotas, setMascotas, loadingMascotas, formOpen, setFormOpen, formLoading, editingMascota, setEditingMascota };

}