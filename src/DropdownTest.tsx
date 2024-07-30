import React from 'react';
import Dropdown, { DropdownOption } from './Dropdown';

const options: DropdownOption[] = [
  { value: '1', label: 'Option one' },
  { value: '2', label: 'Long Option two' },
  { value: '3', label: 'Long Long Option three' },
  { value: '4', label: 'Long Long Long Option four' },
  { value: '5', label: 'Long Long Long Long Option five' },
  { value: '6', label: 'Long Long Long Long Long Option six' },
  { value: '7', label: 'Long Long Long Long Long Long Option seven' },
  { value: '8', label: 'Long Long Long Long Long Long Long Option eight' },
  { value: '9', label: 'Long Long Long Long Long Long Long Long Option nine' },
  { value: '10', label: 'Long Long Long Long Long Long Long Long Long Option ten' },
];

const DropdownTest: React.FC = () => {
  const handleSelect = (selected: DropdownOption | DropdownOption[]) => {
    console.log('Selected options:', selected);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dropdown Test</h1>
      <Dropdown
        options={options}
        multiSelect={true}
        customRenderOption={(option) => (
          <span>
            {option.icon} {option.label}
          </span>
        )}
        searchable={true}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default DropdownTest;
