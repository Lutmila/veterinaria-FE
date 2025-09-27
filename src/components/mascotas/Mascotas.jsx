import "./Hero.css";
import { useEffect, useState } from "react";
import GenericTable from "../GenericTable/GenericTable";
import { tableHeaders } from "./utils";

const Mascotas = () => {
  
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_URL_BACKEND; 

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



  const handleEdit = (mascota) => {
    console.log('Editar mascota:', mascota);
    alert(`Editar mascota: ${mascota.nombre}`);
  };

  const handleDelete = (mascota) => {
    console.log('Eliminar mascota:', mascota);
    if (window.confirm(`¿Estás seguro que deseas eliminar a ${mascota.nombre}?`)) {
      alert(`Eliminando mascota: ${mascota.nombre}`);
    }
  };

  return (
    <section className="hero">
      <div style={{ marginTop: '40px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#ffffff' }}>
          Mascotas registradas
        </h2>
        <GenericTable
          data={mascotas}
          headers={tableHeaders}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
          emptyMessage="No hay mascotas registradas"
          showPagination={true}
          rowsPerPageOptions={[5, 10, 25]}
          defaultRowsPerPage={5}
          tableProps={{
            ariaLabel: "tabla de mascotas registradas",
            containerStyles: { maxWidth: 1200 }
          }}
        />
      </div>
    </section>
  );
};

export default Mascotas;
