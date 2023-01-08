import { useState } from "react";
import HighlightOff from '@mui/icons-material/HighlightOff';
import { Button, TextField, CircularProgress, IconButton } from "@mui/material";
import useContract from "../hooks/useContract";
import styles from "./List.module.css";

const List = () => {
  const [inputTaskValue, setInputTaskValue] = useState("");
  const { tasks, addTask, deleteTask, isPendingTask } = useContract();

  const handleInputChange = (e) => {
    setInputTaskValue(e.target.value);
  };

  const setDefaultValue = () => {
    setInputTaskValue("");
  };

  const handleAddTask = () => {
    Boolean(inputTaskValue) && addTask(inputTaskValue, setDefaultValue);
  };

  const handleDeleteTask = (task) => {
    const taskId = task.id?.toNumber();
    deleteTask(taskId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.addTask}>
        <TextField
          id="add-new-task"
          label="Write a task"
          size="small"
          value={inputTaskValue}
          onChange={handleInputChange}
          disabled={isPendingTask}
        />
        <Button
          variant="contained"
          disabled={isPendingTask}
          onClick={handleAddTask}
        >
          Add +
        </Button>
      </div>
      <div className={styles.confirmText}>
        {isPendingTask ? "Please confirm transaction on Metamask" : ""}
      </div>

      <ul className={styles.listContainer}>
        {tasks?.map((task) => (
          <li
            className={`${styles.listItem} ${
              task.onBlockchain ? styles.liGreen : ""
            } ${task.isDeleting ? styles.liRed : ""}`}
            key={task.id}
          >
            {task.taskText}
            <div className={styles.action}>
              {(task.isDeleting || !task.onBlockchain) && (
                <CircularProgress size={20} />
              )}
              <IconButton size="small" onClick={() => handleDeleteTask(task)}>
                <HighlightOff />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
