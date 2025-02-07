import './App.css';
import InputsForm from './components/InputsForm.tsx';
import { useState } from 'react';
import OutputView from './components/OutputView.tsx';
import { CalculationData } from './types/types.ts';

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
