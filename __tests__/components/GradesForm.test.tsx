import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GradesForm from '../../components/GradesForm';

const mockOnGradeAdded = jest.fn();


describe('GradesForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic rendering tests
  it('renders form with all fields', () => {
    render(<GradesForm onGradeAdded={mockOnGradeAdded} />);
    expect(screen.getByLabelText('Class')).toBeInTheDocument();
    expect(screen.getByLabelText('Grade (0-100)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});

describe('Form Validation', () => {
  it('shows error when class is not selected', async () => {
    render(<GradesForm onGradeAdded={mockOnGradeAdded} />);
    fireEvent.change(screen.getByLabelText('Grade (0-100)'), { target: { value: '90' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    await waitFor(() => {
      expect(screen.getByText('Please select a valid class')).toBeInTheDocument();
    });
  });

  it('shows error for invalid grade values', async () => {
  render(<GradesForm onGradeAdded={mockOnGradeAdded} />);
  
  fireEvent.mouseDown(screen.getByLabelText('Class'));
  fireEvent.click(screen.getByText('Math'));
  
  const invalidGrades = ['-1', '101', '89.5', 'abc'];
  for (const grade of invalidGrades) {
    fireEvent.change(screen.getByLabelText('Grade (0-100)'), { 
      target: { value: grade } 
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
    await waitFor(() => {
      expect(screen.getByRole("alert"))
        .toBeInTheDocument();
    });
  }
});
});

describe('API Integration', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('handles API errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    render(<GradesForm onGradeAdded={mockOnGradeAdded} />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});