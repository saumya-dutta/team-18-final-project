import {render, screen, fireEvent} from '@testing-library/react';
import SignIn from './index';
import '@testing-library/jest-dom';

describe('Sign In and Sign Up', () => {
  const SignIn = {
    title: 'Sign In',
    // difficulty: '2',
    // ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
    // calories: '200',
    // instructions:
    //   'Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl.',
  };

  function renderComponent() {
    render(<SignIn/>);
  }

  it('displays the title', () => {
    renderComponent();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
  it('contains button', () => {
    renderComponent();
    expect(screen.getByRole('Button')).toBeInTheDocument();
  });

//   it('updates instructions when input value changes', () => {
//     const onEditInstructions = jest.fn();

//     const {getByLabelText} = render(
//       <Recipe recipe={recipe} onEditInstructions={onEditInstructions} />,
//     );

//     // eslint-disable-next-line testing-library/prefer-screen-queries
//     const input = getByLabelText(/Edit instructions/);
//     fireEvent.change(input, {target: {value: 'New instructions'}});

//     expect(input.value).toBe('New instructions');
//     expect(onEditInstructions).toHaveBeenCalledTimes(1);
//     expect(onEditInstructions).toHaveBeenCalledWith({
//       ...recipe,
//       instructions: 'New instructions',
//     });
//   });
});