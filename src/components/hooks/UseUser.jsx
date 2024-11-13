import axios from "axios";
import { useEffect, useState } from "react";

function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) return;
    axios.get('/user', {
      withCredentials: true
    })
      .then(({ data }) => {
        setUser(data)
      })
      .catch(error => {
        console.error(error)
      })
  }, []);

  return user;
}

export default useUser;