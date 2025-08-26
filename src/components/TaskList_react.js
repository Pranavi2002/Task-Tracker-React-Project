import React from "react";
import TaskItem from "./TaskItem";
import { FixedSizeList as List } from "react-window";
import { AnimatePresence, motion } from "framer-motion"; // Framer Motion

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  // return (
  //   <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
  //     {tasks.map((task) => (
  //       <TaskItem
  //         key={task.id}
  //         task={task}
  //         onToggle={onToggle}
  //         onDelete={onDelete}
  //         onEdit={onEdit}
  //       />
  //     ))}
  //   </ul>
  // );

  // optimization
  const Row = ({ index, style }) => (
    <div style={style}>
      <TaskItem
        task={tasks[index]}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );

  // Wrap with AnimatePresence to animate items when removed
  return (
    <AnimatePresence>
    <List
      height={400}       // height of the visible list area
      itemCount={tasks.length}
      itemSize={60}      // approximate height of each item
      width="100%"
    >
      {Row}
    </List>
    </AnimatePresence>
  );
};

export default TaskList;