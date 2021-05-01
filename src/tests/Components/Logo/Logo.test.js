import Logo from "../../../app/Components/Logo/Logo";
import { render } from "@testing-library/react";

it("renders correctly", () => {
  const { asFragment } = render(<Logo align="center" />);
  expect(asFragment()).toMatchSnapshot();
});
