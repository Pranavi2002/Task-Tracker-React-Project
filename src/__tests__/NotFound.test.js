// src/__tests__/NotFound.test.js
import React from "react";
import { render } from "@testing-library/react";
import NotFound from "../pages/NotFound";

// Mock useTheme hook
jest.mock("../hooks/useTheme", () => () => ({ theme: "light" }));

describe("NotFound Snapshot", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot(); // Ensure 404 page structure remains stable
  });
});