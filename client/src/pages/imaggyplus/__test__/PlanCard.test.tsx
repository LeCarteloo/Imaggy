import PlanCard from '../PlanCard';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('PlanCard', () => {
  it('Correctly renders PlanCard with props', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PlanCard title="Test" subtitle="Subtitle" list={['Item']} />
      </MemoryRouter>
    );

    const title = getByText(/Test/);
    expect(title).toBeInTheDocument();

    const subtitle = getByText(/Subtitle/);
    expect(subtitle).toBeInTheDocument();

    const list = getByText(/Item/);
    expect(list).toBeInTheDocument();
  });
});
