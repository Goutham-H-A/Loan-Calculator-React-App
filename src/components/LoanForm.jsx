// Updated Loan Calculator App with localStorage, Reset Button, Currency Dropdown, and Validation

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';
import { calculateEMI } from '../utils/emiCalculator';
import ExchangeRates from './ExchangeRates';

function LoanForm() {
  const [principal, setPrincipal] = useState(() => Number(localStorage.getItem('principal')) || 0);
  const [rate, setRate] = useState(() => Number(localStorage.getItem('rate')) || 0);
  const [term, setTerm] = useState(() => Number(localStorage.getItem('term')) || 0);
  const [emi, setEmi] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState(() => localStorage.getItem('baseCurrency') || 'INR');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('principal', principal);
    localStorage.setItem('rate', rate);
    localStorage.setItem('term', term);
    localStorage.setItem('baseCurrency', baseCurrency);
  }, [principal, rate, term, baseCurrency]);

  const handleCalculate = () => {
    if (principal <= 0 || rate <= 0 || term <= 0) {
      setError('All values must be greater than zero.');
      setEmi(null);
      return;
    }
    setError('');
    const result = calculateEMI(principal, rate, term);
    setEmi(result.toFixed(2));
  };

  const handleReset = () => {
    setPrincipal(0);
    setRate(0);
    setTerm(0);
    setEmi(null);
    setBaseCurrency('INR');
    setError('');
    localStorage.clear();
  };

  const currencyOptions = ['INR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CNY'];

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Loan Amount"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={principal}
            onChange={e => setPrincipal(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Annual Interest Rate (%)"
            inputProps={{ inputMode: 'decimal', pattern: '[0-9.]*' }}
            value={rate}
            onChange={e => setRate(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Loan Term (months)"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={term}
            onChange={e => setTerm(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Base Currency</InputLabel>
            <Select
              value={baseCurrency}
              label="Base Currency"
              onChange={e => setBaseCurrency(e.target.value)}
            >
              {currencyOptions.map(currency => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="contained" fullWidth onClick={handleCalculate}>
            Calculate EMI
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="outlined" color="secondary" fullWidth onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {emi && !error && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Monthly EMI: {baseCurrency} {emi}
          </Typography>
          <ExchangeRates amount={emi} baseCurrency={baseCurrency} />
        </>
      )}
    </>
  );
}

export default LoanForm;