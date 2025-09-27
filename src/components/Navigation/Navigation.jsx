import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Inicio' },
    { path: '/mascotas', label: 'Mascotas' },
    { path: '/clientes', label: 'Clientes' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            color: '#ffffff'
          }}
        >
          Aquio | Clínica Veterinaria
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: '#ffffff',
                fontWeight: location.pathname === item.path ? 600 : 400,
                backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                },
                borderRadius: '8px',
                px: 2,
                py: 1,
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;