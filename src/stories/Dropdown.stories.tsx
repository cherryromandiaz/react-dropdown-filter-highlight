import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Dropdown, { DropdownOption } from './Dropdown'; // Adjust the import path

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

const meta = {
  title: 'Example/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    options,
    onSelect: fn(selected => console.log('Selected:', selected)),
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const LabelledDropdown = (args: any) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label htmlFor="dropdown" style={{ margin: '20px' }}>Cherry Romandiaz Makyo Test</label>
    <Dropdown {...args} />
  </div>
);

export const DropdownComponent: Story = {
  render: (args) => <LabelledDropdown {...args} />,
  args: {
    multiSelect: true,
    searchable: true,
    usePortal: false,
    zIndex: 1000
  },
};
