import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { options } from '../utils/utils';

const HomePage = () => {

  return (
    <div className="home-page">
      <Box className="features-section">
        <Grid  justifyContent={"center"} container spacing={4} sx={{ maxWidth: 1200, margin: '0 auto', px: 2 }}>
          {options.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                className="feature-card"
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                  <Box sx={{ fontSize: '4rem', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 600, 
                      color: feature.color,
                      mb: 2 
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#6c757d',
                      mb: 3,
                      lineHeight: 1.6 
                    }}
                  >
                    {feature.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={feature.link}
                    variant="contained"
                    sx={{ 
                      backgroundColor: feature.color,
                      '&:hover': {
                        backgroundColor: feature.color,
                        filter: 'brightness(0.9)'
                      },
                      borderRadius: '8px',
                      py: 1.5,
                      px: 3,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Acceder
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className="stats-section" sx={{ mt: 8, py: 6, backgroundColor: '#f8f9fa' }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            textAlign: 'center',
            color: '#2c3e50',
            fontWeight: 600,
            mb: 1
          }}
        >
          La salud de tu mascota es nuestra prioridad
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center',
            color: '#6c757d',
            maxWidth: '500px',
            margin: '0 auto',
            fontSize: '1.1rem'
          }}
        >
          Brindamos atención veterinaria de mediana y alta complejiad con tecnología moderna y un equipo profesional altamente capactado.
        </Typography>
      </Box>
    </div>
  );
};

export default HomePage;