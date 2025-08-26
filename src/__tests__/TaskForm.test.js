// src/__tests__/TaskForm.test.js
import React from "react";
import { render } from "@testing-library/react";
import TaskForm from "../components/TaskForm";

describe("TaskForm Snapshot", () => {
  // Mock function to simulate adding a task
  const onAddTask = jest.fn();

  it("renders correctly", () => {
    // Render TaskForm component
    const { asFragment } = render(<TaskForm onAddTask={onAddTask} />);
    
    // Take a snapshot to catch UI changes in the future
    expect(asFragment()).toMatchSnapshot();
  });
});