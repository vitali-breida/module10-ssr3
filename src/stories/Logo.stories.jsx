/* eslint-disable react/jsx-props-no-spreading */
import Logo from '../app/Components/Logo';

export default {
  title: 'Logo',
  component: Logo
};

const Template = (args) => <Logo {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  align: 'left'
};
