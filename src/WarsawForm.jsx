// File: src/WarsawForm.jsx
import { useState } from "react";

export default function WarsawInsulinForm() {
  const [inputs, setInputs] = useState({
    carbs: 91,
    fat: 74,
    protein: 54,
    icr: 4.6,
    isf: 10,
    fpuKcal: 100,
  });

  const { carbs, fat, protein, icr, fpuKcal } = inputs;

  const fatKcal = fat * 9;
  const proteinKcal = protein * 4;
  const totalKcal = fatKcal + proteinKcal;
  const fpu = totalKcal / fpuKcal;
  const carbInsulin = carbs / icr;
  const fpuInsulin = fpu;
  const totalInsulin = carbInsulin + fpuInsulin;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Warsaw Method Insulin Calculator</h1>

      {[
        ["carbs", "Carbohydrates (g)"],
        ["fat", "Fat (g)"],
        ["protein", "Protein (g)"],
        ["icr", "ICR (g/unit)"],
        ["isf", "ISF (mg/dL/unit)"],
        ["fpuKcal", "FPU kcal (per unit insulin)"],
      ].map(([name, label]) => (
        <div key={name}>
          <label className="block font-medium mb-1">{label}</label>
          <input
            type="number"
            name={name}
            value={inputs[name]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Results</h2>
        <p>Calories from Fat: {fatKcal.toFixed(1)} kcal</p>
        <p>Calories from Protein: {proteinKcal.toFixed(1)} kcal</p>
        <p>Total Fat + Protein Calories: {totalKcal.toFixed(1)} kcal</p>
        <p>Fat-Protein Units (FPUs): {fpu.toFixed(2)}</p>
        <p>Insulin for Carbs: {carbInsulin.toFixed(2)} units</p>
        <p>Insulin for FPUs: {fpuInsulin.toFixed(2)} units</p>
        <p className="font-bold">Total Insulin Dose: {totalInsulin.toFixed(2)} units</p>
      </div>

      <div className="mt-6 border-t pt-4 space-y-2">
        <h2 className="text-lg font-semibold">Bolus Timing Guide</h2>
        <ul className="list-disc list-inside">
          <li><strong>Carb Insulin:</strong> Give before or with meal.</li>
          <li><strong>Fat/Protein Insulin (MDI):</strong> Split dose: 50% with meal, 50% 3 hrs later.</li>
          <li><strong>Fat/Protein Insulin (Pump):</strong> Extended bolus: 20–30% now, 70–80% over 4–5 hrs.</li>
          <li><strong>Monitor:</strong> Watch glucose for 4–6 hours post-meal.</li>
        </ul>
      </div>
    </div>
  );
}