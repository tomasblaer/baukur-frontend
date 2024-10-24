import axios from "axios";
import { useCallback, useState } from "react";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = useCallback(() => {
    axios.post('/user', {
      email,
      password,
    })
      .then(({ data }) => {
        alert(data);
      })
      .catch(error => {
        console.error(error)
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