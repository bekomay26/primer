import { render, within } from "@testing-library/react";

import LoaderOverlay from "./index";

it("Overlay shows the spinner", () => {
  render(<LoaderOverlay />);

  const { getByTestId } = within(document.getElementById("overlay"));
  expect(getByTestId("spinner")).toBeInTheDocument();
});
