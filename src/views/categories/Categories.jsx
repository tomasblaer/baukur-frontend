import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function Categories() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    axios.get('/categories', {
      withCredentials: true,
    })
      .then(({ data }) => {
        setCategories(data);
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
    <div className="flex flex-row gap-8">
      <div>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button onClick={onSubmit}>Submit</button>      
      </div>
      <div>
        <h1>Categories</h1>
        <div>
          {categories.map(category => (
            <div key={category.id}>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>Expenses</h1>
        <ul>
          <li>Expense 1</li>
          <li>Expense 2</li>
          <li>Expense 3</li>
        </ul>
      </div>
    </div>
  );
}

export default Categories;