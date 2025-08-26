// src/__tests__/TaskList.test.js
import React from "react";
import { render } from "@testing-library/react";
import TaskList from "../components/TaskList";

// Mock TaskItem to simplify snapshot testing
jest.mock("../components/TaskItem", () => (props) => <div>Mocked TaskItem</div>);

describe("TaskList Snapshot", () => {
  // Sample task list
  const tasks = [
    { id: 1, text: "Task 1", completed: false, dueDate: "" },
    { id: 2, text: "Task 2", completed: true, dueDate: "" },
  ];

  // Mock functions for task actions
  const onToggle = jest.fn();
  const onDelete = jest.fn();
  const onEdit = jest.fn();

  it("renders correctly", () => {
    // Render TaskList with mock data
    const { asFragment } = render(
      <TaskList 
        tasks={tasks} 
        onToggle={onToggle} 
        onDelete={onDelete} 
        onEdit={onEdit} 
      />
    );
    // Snapshot testing
    expect(asFragment()).toMatchSnapshot();
  });
});