import { useEffect, useState } from 'react';
import { apiUrl } from '../utils/constants.js';
import { useAlert } from "./useAlert.jsx";

const useClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClienteMascotas, setSelectedClienteMascotas] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedClienteName, setSelectedClienteName] = useState('');
    const [formOpen, setFormOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [editingCliente, setEditingCliente] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [clienteToDelete, setClienteToDelete] = useState(null);
    const { showAlert } = useAlert();

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
    }, []);


    const confirmDelete = async () => {
        if (!clienteToDelete) return;

        try {
            const response = await fetch(`${apiUrl}/clientes/${clienteToDelete._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setClientes(clientes.filter(c => c._id !== clienteToDelete._id));
                showAlert(`${clienteToDelete.nombre} fue eliminado exitosamente`, 'success');
            } else {
                showAlert('Error al eliminar el cliente', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('Error al eliminar el cliente', 'error');
        } finally {
            setDeleteModalOpen(false);
            setClienteToDelete(null);
        }
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
                    showAlert('Cliente actualizado exitosamente', 'success');
                } else {
                    const nuevoClienteConMascotas = { ...clienteResponse, mascotas: [] };
                    const updatedClientes = [...clientes, nuevoClienteConMascotas];
                    setClientes(updatedClientes);
                    showAlert('Cliente registrado exitosamente', 'success');
                }

                setFormOpen(false);
                setEditingCliente(null);
            } else {
                showAlert(`Error al ${isEditing ? 'actualizar' : 'crear'} el cliente`, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert(`Error al ${editingCliente ? 'actualizar' : 'crear'} el cliente`, 'error');
        } finally {
            setFormLoading(false);
        }
    };


    return {
        clientes, setClientes, handleSubmitForm, loading, selectedClienteMascotas, setSelectedClienteMascotas, dialogOpen, setDialogOpen, selectedClienteName, setSelectedClienteName, formOpen, setFormOpen, formLoading, setFormLoading, editingCliente, setEditingCliente, deleteModalOpen, setDeleteModalOpen, clienteToDelete, setClienteToDelete, confirmDelete
    }

};


export default useClientes;