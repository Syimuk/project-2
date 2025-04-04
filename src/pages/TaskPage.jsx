import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, setFilter } from "../features/tasksSlice";
import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import AddTaskModal from "../components/AddTaskModal";
import TaskItem from "../components/TaskItem";

const TaskPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const filter = useSelector((state) => state.tasks.filter);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks =
    filter === "ALL" ? tasks : tasks.filter((t) => t.category === filter);

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Button onClick={() => dispatch(setFilter("ALL"))}>Все</Button>
        <Button onClick={() => dispatch(setFilter("Работа"))}>Работа</Button>
        <Button onClick={() => dispatch(setFilter("Школа"))}>Школа</Button>
        <Button onClick={() => dispatch(setFilter("Личное"))}>Личное</Button>
      </Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Добавить задачу
      </Button>
      <AddTaskModal open={open} onClose={() => setOpen(false)} />
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Box>
  );
};

export default TaskPage;
