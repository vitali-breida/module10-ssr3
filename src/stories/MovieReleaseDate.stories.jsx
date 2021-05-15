/* eslint-disable react/jsx-props-no-spreading */
import { text } from '@storybook/addon-knobs';
import MovieReleaseDate from '../app/Components/MovieReleaseDate';

export default {
  title: 'MovieReleaseDate',
  component: MovieReleaseDate
};

const label = 'Release date';
const defaultValue = '13/04/2012';
const groupId = 'GROUP-ID1';
const value = text(label, defaultValue, groupId);

const Template = (args) => <MovieReleaseDate {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  releaseDate: value
};
