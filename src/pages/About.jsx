import React from 'react';
import { Typography, Box } from '@mui/material';

function About() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        About This App
      </Typography>
      <Typography variant="body1" gutterBottom>
        This app helps you calculate loan EMIs and view currency conversions in real time. Simply enter the loan details, choose your preferred currency, and get the EMI along with conversions in other currencies.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        © {new Date().getFullYear()} Developed By Goutham H A. 
      </Typography>
    </Box>
  );
}

export default About;
