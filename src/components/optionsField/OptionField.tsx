import React, { ChangeEvent, useState } from "react";
import "./optionsField.scss";

interface OptionsFieldProps {
  options: string[];
  label: string;
  dataLabel: string;
  onInputChange: (name: string, value: string) => void; // Passes back the selected option to the parent
}

const OptionsField: React.FC<OptionsFieldProps> = ({
  dataLabel,
  options,
  label,
  onInputChange,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onInputChange(dataLabel, selectedValue); // Update form data in parent
  };

  return (
    <div className="optionsContainer">
      <select
        className="dropDownContainer"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="" disabled>
         {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionsField;
