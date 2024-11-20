import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CategoryPanel from "../../components/panels/CategoryPanel";
import ExpensePanel from "../../components/panels/ExpensePanel";
import useUser from "../../components/hooks/UseUser";
import ProtectedRoute from "../../components/ProtectedRoute";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useUser();

  const fetchCategories = useCallback(() => {
    setLoading(true);
    axios
      .get("/categories", {
        withCredentials: true,
      })
      .then(({ data }) => {
        setCategories(data);
      })
      .catch((error) => {
        toast.error("Failed to fetch categories");
        console.error(error);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ProtectedRoute user={user}>
      <div
        className={`grid gap-2 my-auto ${
          selectedCategory ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        <CategoryPanel
          categories={categories}
          fetchCategories={fetchCategories}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          loading={loading}
        />
        <ExpensePanel
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          fetchCategories={fetchCategories}
          loading={loading}
        />
      </div>
    </ProtectedRoute>
  );
}

export default Dashboard;
