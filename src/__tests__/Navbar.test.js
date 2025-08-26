// src/__tests__/Navbar.test.js
import React from "react";
import { render } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../context/ThemeContext";
import { MemoryRouter } from "react-router-dom";


describe("Navbar Snapshot", () => {
  // Provide mock theme context for testing
  const themeContextValue = { theme: "light", toggleTheme: jest.fn() };

  it("renders correctly", () => {
    // Wrap Navbar in ThemeContext provider
    const { asFragment } = render(
      <MemoryRouter> {/* wrap with MemoryRouter */}
        <ThemeContext.Provider value={themeContextValue}>
          <Navbar />
        </ThemeContext.Provider>
      </MemoryRouter>
    );
    // Snapshot will save the rendered DOM structure
    expect(asFragment()).toMatchSnapshot();
  });
});