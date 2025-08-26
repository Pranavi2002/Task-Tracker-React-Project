import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";

test("App renders without crashing", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});