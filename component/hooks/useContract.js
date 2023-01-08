import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useProvider from "./useProvider";
import { TodoListContractAddress } from "../../config";
import TodoList from "../../../tdl-be/build/contracts/PaymentContract.json";
import useConnection from "./useConnection";

const useContract = () => {
  const [tasks, setTasks] = useState([]);
  const [isPendingTask, setIsPendingTask] = useState(false);
  const [contract, setContract] = useState(null);
  const { signer } = useProvider();
  const { addressConnected } = useConnection();

  const getTasks = async () => {
    try {
      const tasksFromBlockchain = await contract.getMyTasks();
      const tasksWithValidation = tasksFromBlockchain.map((task) => ({
        ...task,
        onBlockchain: true,
      }));
      setTasks(tasksWithValidation);
    } catch (e) {
      console.log(e);
    }
  };

  const addTask = async (taskText, setDefaultValue) => {
    const newTask = { taskText, isDeleted: false };
    setIsPendingTask(true);

    try {
      await contract.addTask(newTask.taskText, newTask.isDeleted);
      setTasks((prev) => [...prev, newTask]);
      setDefaultValue();
    } catch (e) {
      console.log(e);
    } finally {
      setIsPendingTask(false);
    }
  };

  const deleteTask = async (taskId) => {
    const newTask = { taskId, isDeleted: true };
    setIsPendingTask(true);

    try {
      await contract.deleteTask(taskId, newTask.isDeleted);
      setTasks((prev) =>
        [...prev].map((task) =>
          task.id?.toNumber() === taskId
            ? { ...task, isDeleting: true }
            : { ...task }
        )
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsPendingTask(false);
    }
  };

  useEffect(() => {
    if (!contract) return;
    getTasks();
  }, [contract, addressConnected]);

  useEffect(() => {
    if (!signer || contract) return;
    const TodoListContract = new ethers.Contract(
      TodoListContractAddress,
      TodoList.abi,
      signer
    );
    setContract(TodoListContract);
  }, [signer]);

  const handleAddTaskEvent = (sender, taskId) => {
    getTasks();
    console.log(
      `Confirmed ADD task on blockchain - TaskId: ${taskId} - Sender: ${sender}`
    );
  };

  const handleDeleteTaskEvent = (taskId) => {
    setTasks((prev) =>
      prev.filter((task) => task.id.toNumber() !== taskId.toNumber())
    );
    console.log(`Confirmed DELETE task on blockchain - TaskId: ${taskId}`);
  };

  // when contract is ready, subscribe to blockchain events
  useEffect(() => {
    if (!contract) return;
    contract.on("AddTask", handleAddTaskEvent);
    contract.on("DeleteTask", handleDeleteTaskEvent);

    return () => {
      contract.off("AddTask", handleAddTaskEvent);
      contract.off("DeleteTask", handleDeleteTaskEvent);
    };
  }, [contract]);

  return {
    tasks,
    addTask,
    deleteTask,
    isPendingTask,
  };
};

export default useContract;
