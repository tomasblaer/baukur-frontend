import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = useCallback(() => {
    axios.post('/user', {
      email,
      password,
    })
      .then(() => {
        window.location.href = '/login';
      })
      .catch(error => {
        if (error.response.status === 409) {
          return toast.error('User with that email already exists!');
        } else {
          return toast.error('Failed to create new user');
        }
      });
  }, [email, password]);

  return (
      <div>
          <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={onRegister}>Register</button>
      </div>
  )
}

export default Register