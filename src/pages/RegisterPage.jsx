import { useDispatch } from 'react-redux';
import { registerUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigate('/login');
    } catch {
      alert('Ошибка при регистрации');
    }
  };

  return (
    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Имя" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Зарегистрироваться</Button>
    </Box>
  );
};

export default RegisterPage;
