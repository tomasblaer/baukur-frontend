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
      <div className="flex flex-col bg-gray-100 p-28 rounded-xl gap-4">
          <h1 className="text-2xl font-semibold">Register</h1>
          <input className="p-2 rounded-lg" type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="p-2 rounded-lg" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="p-2 rounded-lg bg-gray-50 hover:bg-gray-200 transition-all" onClick={onRegister}>Submit</button>
      </div>
  )
}

export default Register