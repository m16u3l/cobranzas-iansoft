'use client';

import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const features = [
  {
    title: 'Gestión Segura',
    description: 'Manejo seguro y confidencial de la información de deudores y cobranzas.',
    icon: <SecurityIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Alta Eficiencia',
    description: 'Optimización de procesos de cobranza para maximizar resultados.',
    icon: <SpeedIcon fontSize="large" color="primary" />,
  },
];

export default function Home() {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper 
        elevation={0} 
        sx={{ 
          width: '100%',
          p: { xs: 2, sm: 3, md: 5 }, 
          textAlign: 'center',
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
            }}
          >
            IanSoft
          </Typography>
          <Typography 
            variant="h5" 
            component="h2" 
            color="textSecondary"
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1.2rem', sm: '1.5rem' }
            }}
          >
            Soluciones Inteligentes para Gestión de Cobranzas
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={{ xs: 2, md: 4 }} 
          sx={{ 
            mb: { xs: 4, md: 6 },
            justifyContent: 'center' // Center cards horizontally
          }}
        >
          {features.map((feature) => (
            <Grid component={Box} key={feature.title}>
              <Card 
                elevation={2}
                sx={{ 
                  width: 300, // Fixed width
                  height: 280, // Fixed height
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: (theme) => theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ 
                  textAlign: 'center', 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  p: 3,
                  justifyContent: 'center', // Center content vertically
                }}>
                  <Box sx={{ 
                    mb: 2,
                    '& .MuiSvgIcon-root': { // Make icons bigger
                      fontSize: '3rem'
                    }
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="textSecondary"
                    sx={{ 
                      lineHeight: 1.6,
                      // Ensure text doesn't overflow
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ 
          mt: { xs: 4, md: 8 }, 
          p: { xs: 3, md: 4 }, 
          bgcolor: 'primary.main', 
          color: 'white', 
          borderRadius: 2,
          maxWidth: '1000px',
          mx: 'auto',
        }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Sobre Nosotros
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
          >
            IanSoft es una empresa líder en el desarrollo de soluciones tecnológicas 
            para la gestión de cobranzas. Nuestro sistema permite a las empresas 
            optimizar sus procesos de recuperación de cartera, mantener un seguimiento 
            efectivo de deudores y maximizar la eficiencia en las operaciones de cobranza.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
