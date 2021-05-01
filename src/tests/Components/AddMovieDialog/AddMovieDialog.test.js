import { render, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import AddMovieDialog from "../../../app/Components/AddMovieDialog/AddMovieDialog";
import { act } from "react-dom/test-utils";

jest.mock("react-redux");

describe("AddMovieDialog", () => {
  it("should render components", () => {
    useSelector.mockImplementation(() => {
      return true;
    });

    const { getByRole } = render(<AddMovieDialog />);

    let element = getByRole("dialog", { name: "ADD MOVIE" });
    expect(element).toBeDefined();

    element = getByRole("heading", { name: "ADD MOVIE" });
    expect(element).toBeDefined();

    let title = getByRole("textbox", { name: "Title" });
    expect(title).toBeDefined();

    let movieUrl = getByRole("textbox", { name: "Movie URL" });
    expect(movieUrl).toBeDefined();

    let overview = getByRole("textbox", { name: "Overview" });
    expect(overview).toBeDefined();

    let runtime = getByRole("textbox", { name: "Runtime" });
    expect(runtime).toBeDefined();

    // buttons
    let reset = getByRole("button", { name: "Reset" });
    expect(reset).toBeDefined();

    let submit = getByRole("button", { name: "Submit" });
    expect(submit).toBeDefined();

    //set Title
    act(() => {
      fireEvent.change(title, { target: { value: "Some title" } });
    });
    expect(title.value).toBe("Some title");

    // set url
    act(() => {
      fireEvent.change(movieUrl, { target: { value: "https://test.com" } });
    });
    expect(movieUrl.value).toBe("https://test.com");
  });
});
