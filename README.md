
![Preview](https://i.ibb.co.com/ZH82cQT/preview.jpg)
# React Dropdown Component with Option Filter and Highlight Text features.
A customizable dropdown component for React with search and multi-select functionality, and keyword highlighting support.

## Installation
You can install the package via npm:

### `npm install react-dropdown-filter`

### Usage
Here's how you can use the Dropdown component in your React project:

Basic Example
Import the Component
```
import React from 'react';
import Dropdown, { DropdownOption } from 'react-dropdown-filter';
```

Define Your Options
```
const options: DropdownOption[] = [
  { value: '1', label: 'Option one' },
  { value: '2', label: 'Long Option two' },
  // Add more options as needed
];`
```
Implement the Dropdown Component
```
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
```

## Component Props
options: An array of DropdownOption objects. Each option must have a value and a label, and can optionally include an icon.
```
interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactElement;
}
```

<b> multiSelect </b> : (Optional) Boolean to enable or disable multi-select functionality. Default is true.

<b> customRenderOption </b>: (Optional) A function to customize the rendering of each option. Receives a DropdownOption and returns a React.ReactElement.

<b> searchable </b>: (Optional) Boolean to enable or disable the search bar. Default is true.

<b> usePortal </b>: (Optional) Boolean to render the dropdown menu in a portal (i.e., outside the normal DOM hierarchy). Default is false.

<b> zIndex </b>: (Optional) Number to set the z-index of the dropdown menu. Default is 1000.

<b> onSelect</b> : A callback function that receives the selected option(s). The parameter can be a single DropdownOption or an array of DropdownOption.

## Customization
<b> HighlightText Component </b>: The HighlightText component is used internally to highlight the search term within the options' labels. You can customize its behavior by modifying the HighlightText component code.

<b> CSS </b>: The component uses CSS classes for styling. Ensure that you include styles.css or customize the styles according to your needs.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License
