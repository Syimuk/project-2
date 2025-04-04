import { useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/tasks");
    } catch {
      alert("Неверный email или пароль");
    }
  };

  return (
    <Box sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Войти
      </Button>
    </Box>
  );
};

export default LoginPage;
