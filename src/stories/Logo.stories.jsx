/* eslint-disable react/jsx-props-no-spreading */
import { withKnobs, text } from '@storybook/addon-knobs';
import Logo from '../app/Components/Logo';

export default {
  title: 'Logo',
  // component: Logo,
  decorators: [withKnobs]
};

// Knobs for React props
const label = 'Type left ot center please to see how it works';
const defaultValue = 'left';
const groupId = 'GROUP-ID1';
const value = text(label, defaultValue, groupId);

const Template = (args) => <Logo {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  align: value
};
