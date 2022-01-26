import { screen, render } from "@testing-library/react";
import Dropdown from "./index";
import userEvent from "@testing-library/user-event";

it("Dropdown doesn't show options when clicked", () => {
  const mockOnChange = jest.fn();
  render(
    <Dropdown
      options={[{ label: "one", value: "one" }]}
      title="Choose"
      onChange={mockOnChange}
    />
  );

  expect(screen.queryByText(/ALL/i)).toBeTruthy();
  expect(screen.queryByText(/one/i)).toBeFalsy();
});

it("Dropdown shows options list when clicked", () => {
  const mockOnChange = jest.fn();
  render(
    <Dropdown
      options={[{ label: "one", value: "one" }]}
      title="Choose"
      onChange={mockOnChange}
      defaultValue="ALL"
    />
  );

  expect(screen.getByText(/ALL/i)).toBeTruthy();
  // expect(screen.getByRole("button", { expanded: false }));
  // fireEvent.click(screen.getByText(/Choose/i));
  userEvent.click(screen.getByText(/ALL/i));

  expect(screen.getByText(/one/i)).toBeTruthy();
  expect(screen.queryByRole("list")).toBeInTheDocument();
});

it("Dropdown changes selected value when user selects option", () => {
  const mockOnChange = jest.fn();
  render(
    <Dropdown
      options={[{ label: "one", value: "one" }]}
      title="Choose"
      onChange={mockOnChange}
    />
  );

  expect(screen.getByText(/ALL/i)).toBeTruthy();
  userEvent.click(screen.getByText(/ALL/i));

  const optionOneListItem = screen
    .getAllByRole("listitem")
    .find((listitem) => listitem.textContent === "one");

  userEvent.click(optionOneListItem);
  expect(mockOnChange).toHaveBeenCalledTimes(1);

  expect(screen.getByText(/one/i)).toBeTruthy();

  // list items are hidden
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});
