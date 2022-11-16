import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import InfoBlock from '../InfoBlock';

describe('InfoBlock', () => {
  it('Correctly renders InfoBlock with props', () => {
    const props = {
      title: 'Title',
      desc: 'Desc',
      img: 'Img',
    };
    const { getByText } = render(<InfoBlock {...props} />);

    const title = getByText(/Title/);
    expect(title).toBeInTheDocument();

    const desc = getByText(/Desc/);
    expect(desc).toBeInTheDocument();
  });
});
