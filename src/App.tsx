import { useState } from 'react';
import './App.css';
import { InputsForm, OutputView } from './components';
import { CalculationData } from './types';

export default function App() {
  const [calculationResults, setCalculationResults] =
    useState<CalculationData | null>(null);

  const resetCalculation = () => {
    setCalculationResults(null);
  };

  return (
    <>
      <h1>Charging points simulator</h1>
      {calculationResults ? (
        <OutputView
          resetCalculation={resetCalculation}
          calculationResults={calculationResults}
        />
      ) : (
        <InputsForm setCalculationResults={setCalculationResults} />
      )}
    </>
  );
}
