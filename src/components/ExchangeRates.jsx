import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function ExchangeRates({ amount }) {
  const [rates, setRates] = useState({});

  useEffect(() => {
    axios.get('https://v6.exchangerate-api.com/v6/3e91f7a0fb22d6f47fc13cbd/latest/USD')
      .then(res => setRates(res.data.conversion_rates))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4 }}>
        EMI in Other Currencies
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(rates).slice(0, 10).map(([currency, rate]) => (
              <TableRow key={currency}>
                <TableCell>{currency}</TableCell>
                <TableCell>{(amount * rate).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ExchangeRates;
