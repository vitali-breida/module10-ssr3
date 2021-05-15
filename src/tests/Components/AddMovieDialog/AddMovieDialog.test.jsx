/* eslint-disable no-undef */
import { render, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { act } from 'react-dom/test-utils';
import AddMovieDialog from '../../../app/Components/AddMovieDialog';

jest.mock('react-redux');

describe('AddMovieDialog', () => {
  it('should render components', () => {
    useSelector.mockImplementation(() => true);

    const { getByRole } = render(<AddMovieDialog />);

    let element = getByRole('dialog', { name: 'ADD MOVIE' });
    expect(element).toBeDefined();

    element = getByRole('heading', { name: 'ADD MOVIE' });
    expect(element).toBeDefined();

    const title = getByRole('textbox', { name: 'Title' });
    expect(title).toBeDefined();

    const movieUrl = getByRole('textbox', { name: 'Movie URL' });
    expect(movieUrl).toBeDefined();

    const overview = getByRole('textbox', { name: 'Overview' });
    expect(overview).toBeDefined();

    const runtime = getByRole('textbox', { name: 'Runtime' });
    expect(runtime).toBeDefined();

    // buttons
    const reset = getByRole('button', { name: 'Reset' });
    expect(reset).toBeDefined();

    const submit = getByRole('button', { name: 'Submit' });
    expect(submit).toBeDefined();

    // set Title
    act(() => {
      fireEvent.change(title, { target: { value: 'Some title' } });
    });
    expect(title.value).toBe('Some title');

    // set url
    act(() => {
      fireEvent.change(movieUrl, { target: { value: 'https://test.com' } });
    });
    expect(movieUrl.value).toBe('https://test.com');
  });
});
