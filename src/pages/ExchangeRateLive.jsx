import React from 'react';
import ExchangeRates from '../components/ExchangeRates';

function ExchangeRateLive() {
  return (
    <>
      <h1>Live Exchange Rates</h1>
      <ExchangeRates amount={1} />
    </>
  );
}

export default ExchangeRateLive;

