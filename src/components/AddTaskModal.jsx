import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTask } from "../features/tasksSlice";

const AddTaskModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Работа");

  const handleAdd = async () => {
    await dispatch(addTask({ title, category }));
    setTitle("");
    setCategory("Работа");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{ p: 4, backgroundColor: "white", margin: "10% auto", width: 400 }}
      >
        <TextField
          fullWidth
          label="Задача"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          fullWidth
          label="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Работа">Работа</MenuItem>
          <MenuItem value="Школа">Школа</MenuItem>
          <MenuItem value="Личное">Личное</MenuItem>
        </TextField>
        <Button
          onClick={handleAdd}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Добавить
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
