// src/__tests__/About.test.js
import React from "react";
import { render } from "@testing-library/react";
import About from "../pages/About";

// Mock useTheme hook
jest.mock("../hooks/useTheme", () => () => ({ theme: "light" }));

describe("About Snapshot", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<About />);
    expect(asFragment()).toMatchSnapshot(); // Save and check About page UI
  });
});