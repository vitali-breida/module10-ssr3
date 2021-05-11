/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import Logo from '../../../app/Components/Logo';

it('renders correctly', () => {
  const { asFragment } = render(<Logo align="center" />);
  expect(asFragment()).toMatchSnapshot();
});
