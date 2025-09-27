export const tableHeaders = [
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