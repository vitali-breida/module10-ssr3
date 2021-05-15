/* eslint-disable react/jsx-props-no-spreading */
import AddMovieButton from '../app/Components/AddMovieButton';

export default {
  title: 'AddMovieButton',
  component: AddMovieButton
};

const Template = (args) => <AddMovieButton {...args} />;

export const Story = Template.bind({});

Story.args = {
};
