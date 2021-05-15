/* eslint-disable react/jsx-props-no-spreading */
import MovieGenre from '../app/Components/MovieGenre';

export default {
  title: 'MovieGenre',
  component: MovieGenre
};

const Template = (args) => <MovieGenre {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  genres: ['Action', 'Drama', 'Comedy']
};
