import PricingSection from '../PricingSection';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('PricingSection', () => {
  it('Initial plan should be Monthly plan', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <PricingSection />
      </MemoryRouter>
    );
    const monthlyBtn = getByRole('button', {
      name: 'Monthly plan',
      pressed: true,
    });

    expect(monthlyBtn).toBeInTheDocument();
  });

  it('Plan should change to Yearly plan', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <PricingSection />
      </MemoryRouter>
    );

    const yearlyBtn = getByRole('button', { name: 'Yearly plan' });
    fireEvent.click(yearlyBtn);

    const yearlyBtnClicked = getByRole('button', {
      name: 'Yearly plan',
      pressed: true,
    });

    expect(yearlyBtnClicked).toBeInTheDocument();
  });
});
