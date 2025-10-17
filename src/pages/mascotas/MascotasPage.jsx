import { Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GenericTable from "../../components/GenericTable/GenericTable";
import FormularioMascota from "../../components/FormularioMascota/FormularioMascota";
import ConfirmationModal from "../../components/common/ConfirmationModal/ConfirmationModal";
import { useSearch } from "../../hooks/useSearch.jsx";
import './MascotasPage.css';
import { headerMascotas } from "../../utils/utils";
import { useMascotas } from "./hooks/useMascotas.jsx";

const MascotasPage = () => {

  const { handleSubmitForm, mascotaToDelete, setMascotaToDelete, setDeleteModalOpen, confirmDelete, deleteModalOpen, mascotas, loadingMascotas, formOpen, setFormOpen, formLoading, editingMascota, setEditingMascota } = useMascotas();
  const { searchTerm, filteredData: filteredMascotas, handleSearch } = useSearch(mascotas, 'nombre');

  const handleOpenForm = () => {
    setEditingMascota(null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingMascota(null);
  };

  const handleEdit = (mascota) => {
    setEditingMascota(mascota);
    setFormOpen(true);
  };

  const handleDelete = (mascota) => {
    setMascotaToDelete(mascota);
    setDeleteModalOpen(true);
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
          loading={loadingMascotas}
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

      <ConfirmationModal
        openModal={deleteModalOpen}
        closeModal={cancelDelete}
        textAcept="Eliminar"
        textCancel="Cancelar"
        actionAcept={confirmDelete}
        actionCancel={cancelDelete}
      >
        <p>
          ¿Estás seguro que deseas eliminar a{' '}
          <strong>{mascotaToDelete?.nombre}</strong>?
        </p>

      </ConfirmationModal>
    </div>
  );
};

export default MascotasPage;