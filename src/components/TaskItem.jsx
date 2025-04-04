import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasksSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <Card
      sx={{
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography color="text.secondary">{task.category}</Typography>
      </CardContent>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default TaskItem;
