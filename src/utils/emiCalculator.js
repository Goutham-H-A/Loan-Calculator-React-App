export function calculateEMI(P, annualRate, N) {
    const R = annualRate / 12 / 100;
    return (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  }
  
  