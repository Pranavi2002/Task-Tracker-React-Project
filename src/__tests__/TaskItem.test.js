// src/__tests__/TaskItem.test.js
import React from "react";
import { render } from "@testing-library/react";
import TaskItem from "../components/TaskItem";

// Mock the useTheme hook since TaskItem uses it
jest.mock("../hooks/useTheme", () => () => ({ theme: "light" }));

describe("TaskItem Snapshot", () => {
  // Sample task object for testing
  const mockTask = { id: 1, text: "Test Task", completed: false, dueDate: "2025-08-24" };
  
  // Mock functions for task actions
  const onToggle = jest.fn();
  const onDelete = jest.fn();
  const onEdit = jest.fn();

  it("renders correctly", () => {
    // Render component and take a snapshot
    const { asFragment } = render(
      <TaskItem 
        task={mockTask} 
        onToggle={onToggle} 
        onDelete={onDelete} 
        onEdit={onEdit} 
      />
    );
    // Compare current render to saved snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});