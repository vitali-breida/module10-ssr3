/* eslint-disable react/jsx-props-no-spreading */
import { withKnobs, array } from '@storybook/addon-knobs';
import MovieGenre from '../app/Components/MovieGenre';

export default {
  title: 'MovieGenre',
  // component: MovieGenre,
  decorators: [withKnobs]
};

const label = 'Genres';
const defaultValue = ['Drama', 'Comedy'];
const value = array(label, defaultValue);

const Template = (args) => <MovieGenre {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  genres: value
};
