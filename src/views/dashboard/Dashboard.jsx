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
  }, [fetchCategories]);

  return (
    <div className={`flex flex-row gap-2`}>
      <CategoryPanel categories={categories} fetchCategories={fetchCategories} setSelectedCategory={setSelectedCategory} />
      <ExpensePanel selectedCategory={selectedCategory} />
    </div>
  );
}

export default Dashboard;