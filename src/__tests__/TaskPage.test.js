// src/__tests__/TaskPage.test.js
import React from "react";
import { render } from "@testing-library/react";
import TaskPage from "../pages/TaskPage";

// Mock hooks used in TaskPage
jest.mock("../hooks/useTheme", () => () => ({ theme: "light" }));
jest.mock("../hooks/useTasks", () => () => ({
  tasks: [
    { id: 1, text: "Task 1", completed: false, dueDate: "2025-08-24" },
    { id: 2, text: "Task 2", completed: true, dueDate: "" },
  ],
  addTask: jest.fn(),
  deleteTask: jest.fn(),
  editTask: jest.fn(),
  toggleTask: jest.fn(),
}));

describe("TaskPage Snapshot", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<TaskPage />);
    expect(asFragment()).toMatchSnapshot(); // Save and compare page DOM structure
  });
});