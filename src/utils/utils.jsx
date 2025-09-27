import { IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

export const options = [
    {
        title: 'Gestión de Mascotas',
        description: 'Administrar las mascotas de la clinica',
        link: '/mascotas',
        color: '#4CAF50'
    },
    {

        title: 'Gestión de Clientes',
        description: 'Administrar los clientes de la clinica',
        link: '/clientes',
        color: '#2196F3'
    }
];

export const headerClientes = (callback) => {

    return [
    {
        key: 'nombre',
        label: 'Nombre',
        align: 'left'
    },
    {
        key: 'email',
        label: 'Email',
        align: 'left'
    },
    {
        key: 'telefono',
        label: 'Teléfono',
        align: 'left'
    },
    {
        key: 'mascotas',
        label: 'Mascotas',
        align: 'center',
        render: (value, cliente) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'medium' }}>
                    {cliente.mascotas ? cliente.mascotas.length : 0}
                </span>
                {cliente.mascotas && cliente.mascotas.length > 0 && (
                    <IconButton
                        size="small"
                        onClick={() => callback(cliente)}
                        sx={{
                            color: '#1976d2',
                            '&:hover': { backgroundColor: '#e3f2fd' }
                        }}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                )}
            </div>
        )
    }
];
} 

export const headerMascotas = [
    {
        key: 'nombre',
        label: 'Nombre',
        align: 'left'
    },
    {
        key: 'especie',
        label: 'Especie',
        align: 'left'
    },
    {
        key: 'raza',
        label: 'Raza',
        align: 'left'
    },
    {
        key: 'edad',
        label: 'Edad',
        align: 'center',
        render: (value) => `${value} ${value === 1 ? 'año' : 'años'}`
    },
    {
        key: 'cliente_id',
        label: 'Cliente',
        align: 'left',
        render: (value) => value ? value.nombre : 'Sin asignar'
    }
];