import '@testing-library/jest-dom';
import { fireEvent, render, screen, act } from '@testing-library/react';
import Home from '@/app/page';

describe('Calculator', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renders a calculator', () => {
    expect(screen.getByTestId('result')).toBeInTheDocument();
    expect(screen.getByTestId('num1')).toBeInTheDocument();
    expect(screen.getByTestId('num2')).toBeInTheDocument();
    expect(screen.getByTestId('add')).toBeInTheDocument();
    expect(screen.getByTestId('subtract')).toBeInTheDocument();
    expect(screen.getByTestId('multiply')).toBeInTheDocument();
    expect(screen.getByTestId('divide')).toBeInTheDocument();
  });

  it('add numbers', () => {
    const num1input = screen.getByTestId('num1');
    const num2input = screen.getByTestId('num2');
    const addButton = screen.getByTestId('add');
    const resultArea = screen.getByTestId('result');

    act(() => {
      fireEvent.change(num1input, { target: { value: '5' } });
      fireEvent.change(num2input, { target: { value: '8' } });
      addButton.click();
    });
    expect(resultArea).toHaveTextContent('13');
  });
});
