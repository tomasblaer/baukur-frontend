import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

function Expenses() {
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');

  const onSubmit = useCallback(() => {
    axios.post('/expenses', {
      name,
      comment,
      amount,
      date,
      categoryId
    })
      .then(({ data }) => {
        alert('Success');
        console.log(data);
      })
      .catch(() => {
        toast.error('Error');
      });
  }, [name, comment, amount, date, categoryId]);

  const getCategories = useCallback(() => {
    axios.get('/categories', {
      withCredentials: true,
    })
      .then(response => {
        if (response.data.length < 1) {
          alert('No categories registered');
        }
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error)
      });
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <>
      <div>
        {categories.map(category => (
          <div key={category.id}>
            <input type="radio" name="category" value={category.id} onChange={e => setCategoryId(e.target.value)} />
            <label>{category.name}</label>
          </div>
        ))}
      </div>
      {categoryId && (
      <div>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Comment" value={comment} onChange={e => setComment(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <input type="date" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} />
        <button onClick={onSubmit}>Submit</button>
      </div>
      )}
    </>
  );

}

export default Expenses;