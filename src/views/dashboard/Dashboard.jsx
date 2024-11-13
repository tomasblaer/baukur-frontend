import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CategoryPanel from "../../components/panels/CategoryPanel";
import ExpensePanel from "../../components/panels/ExpensePanel";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const fetchCategories = useCallback(() => {
    axios.get('/categories', {
      withCredentials: true,
    })
      .then(({ data }) => {
        setCategories(data);
      })
      .catch(error => {
        toast.error('Failed to fetch categories');
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={`grid gap-2 auto-cols-auto ${selectedCategory && '!grid-cols-2'}`}>
      <CategoryPanel categories={categories} fetchCategories={fetchCategories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      <ExpensePanel selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} fetchCategories={fetchCategories} />
    </div>
  );
}

export default Dashboard;