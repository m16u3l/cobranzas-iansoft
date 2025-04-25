'use client';

import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Icon,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportIcon from '@mui/icons-material/Support';

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
  {
    title: 'Soporte 24/7',
    description: 'Asistencia técnica y soporte continuo para nuestros clientes.',
    icon: <SupportIcon fontSize="large" color="primary" />,
  },
];

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 5, 
          textAlign: 'center',
          background: 'transparent'
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main' 
          }}
        >
          IanSoft
        </Typography>
        <Typography 
          variant="h5" 
          component="h2" 
          color="textSecondary" 
          paragraph
          sx={{ mb: 6 }}
        >
          Soluciones Inteligentes para Gestión de Cobranzas
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, p: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Sobre Nosotros
          </Typography>
          <Typography variant="body1" paragraph>
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
