import axios from "axios";
import { useCallback, useState } from "react";

function Categories() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const getCategories = useCallback(() => {
    axios.get('/categories', {
      withCredentials: true,
    })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      });
  }, []);

  const onSubmit = useCallback(() => {  
    axios.post('/categories', {
      name,
      description
    })
      .then(({ data }) => {
        alert('Success');
        console.log(data);
      })
      .catch(error => {
        console.error(error)
      });
  }, [name, description]);

  return (
    <>
      <div>
        <button onClick={getCategories}>Get categories</button>
      </div>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button onClick={onSubmit}>Submit</button>      
      </div>
    </>
  );
}

export default Categories;