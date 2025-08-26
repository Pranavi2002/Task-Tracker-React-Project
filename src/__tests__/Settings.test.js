// src/__tests__/Settings.test.js
import React from "react";
import { render } from "@testing-library/react";
import Settings from "../pages/Settings";

// Mock useTheme hook
jest.mock("../hooks/useTheme", () => () => ({
  theme: "light",
  toggleTheme: jest.fn(),
}));

describe("Settings Snapshot", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Settings />);
    expect(asFragment()).toMatchSnapshot(); // Capture DOM for theme toggle page
  });
});