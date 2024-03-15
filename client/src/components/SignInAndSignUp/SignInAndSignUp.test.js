import {render, screen, fireEvent} from '@testing-library/react';
import SignIn from './index';
import '@testing-library/jest-dom';

describe('Sign In and Sign Up', () => {
  const SignIn = {
    title: 'Sign In'
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


});