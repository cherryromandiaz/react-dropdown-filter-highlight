import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; // Import the CSS file

// HighlightText Component

interface HighlightProps {
  value?: string;
}

const Highlight = ({ value }: HighlightProps) => (
  <span className="highlight-text">{value}</span>
);

interface HighlightTextProps {
  text: string;
  value?: string;
  caseIgnored?: boolean;
}

const HighlightText = ({ text, value, caseIgnored = true }: HighlightTextProps) => {
  if (!value) return <>{text}</>;

  const splitMatch = new RegExp(value.replace(/\\/g, '\\\\'), caseIgnored ? 'ig' : 'g');
  const values = text.match(splitMatch) || [];
  const matched = text.split(splitMatch);

  return (
    <div>
      {matched.map((item, idx) => (
        <React.Fragment key={idx}>
          {item}
          {idx < values.length && <Highlight value={values[idx]} />}
        </React.Fragment>
      ))}
    </div>
  );
};

// Dropdown Component

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactElement;
}

interface DropdownProps {
  options: DropdownOption[];
  multiSelect?: boolean;
  customRenderOption?: (option: DropdownOption) => React.ReactElement;
  searchable?: boolean;
  usePortal?: boolean;
  zIndex?: number;
  onSelect: (selected: DropdownOption | DropdownOption[]) => void;
}

const Dropdown = ({
  options,
  multiSelect = false,
  customRenderOption,
  searchable = true,
  usePortal = false,
  zIndex = 1000,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option: DropdownOption) => {
    if (multiSelect) {
      const newSelection = selectedOptions.includes(option)
        ? selectedOptions.filter(o => o !== option)
        : [...selectedOptions, option];
      setSelectedOptions(newSelection);
      onSelect(newSelection);
    } else {
      setSelectedOptions([option]);
      onSelect(option);
      setIsOpen(false);
    }
  };

  const handleRemoveOption = (option: DropdownOption) => {
    const newSelection = selectedOptions.filter(o => o !== option);
    setSelectedOptions(newSelection);
    onSelect(newSelection);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as Node;
    const dropdownElement = document.querySelector('.dropdown-container');
    if (dropdownElement && !dropdownElement.contains(target)) {
      setIsOpen(false);
    }
  };

  // Add document click event listener when dropdown is open
  if (isOpen) {
    document.addEventListener('mousedown', handleDocumentClick);
  } else {
    document.removeEventListener('mousedown', handleDocumentClick);
  }

  const renderOption = (option: DropdownOption) => (
    <div
      key={option.value}
      onClick={() => handleOptionClick(option)}
      className={`dropdown-option ${selectedOptions.includes(option) ? 'selected' : ''}`}
    >
      {option.icon && <div className="option-icon">{option.icon}</div>}
      <div className="keyword-wrapper">
        <HighlightText text={option.label} value={searchTerm} />
      </div>
    </div>
  );

  const dropdownContent = (
    <div className="dropdown-content" style={{ zIndex }}>
      {searchable && (
        <div className="search-bar">
          <span className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder=""
            className="search-input"
          />
          {searchTerm && <button onClick={handleClearSearch} className="clear-button"><span className="clear-icon" /></button>}
        </div>
      )}
      {filteredOptions.length ? (
        filteredOptions.map(option => renderOption(option))
      ) : (
        <div className="no-options">No options found</div>
      )}
    </div>
  );

  return (
    <div className="dropdown-container">
      <div
        onClick={handleDropdownClick}
        className="dropdown-trigger"
      >
        <div className="dropdown-selected-options">
          {selectedOptions.length
            ? selectedOptions.map(option => (
                <SelectedOption key={option.value} option={option} onRemove={handleRemoveOption} />
              ))
            : 'Select'}
        </div>
        <span className="dropdown-icon" />
      </div>
      {isOpen &&
        (usePortal
          ? ReactDOM.createPortal(dropdownContent, document.body)
          : dropdownContent)}
    </div>
  );
};

const SelectedOption = ({ option, onRemove }: { option: DropdownOption; onRemove: (option: DropdownOption) => void }) => (
  <span className="selected-option">
    {option.label}
    <button onClick={() => onRemove(option)} className="close-button">
      <span className="close-icon" />
    </button>
  </span>
);

export default Dropdown;