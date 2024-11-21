import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(0);
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [selectedDefaultCategories, setSelectedDefaultCategories] = useState(
    []
  );
  const [createdUserId, setCreatedUserId] = useState(null);

  const onRegister = useCallback(() => {
    axios
      .post("/user", {
        email,
        password,
      })
      .then(({ data }) => {
        setCreatedUserId(data.id);
        toast.success("User created successfully!");
        setPage(1);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          return toast.error("User with that email already exists!");
        } else {
          return toast.error("Failed to create new user");
        }
      });
  }, [email, password]);

  useEffect(() => {
    axios
      .get("/categories/default")
      .then(({ data }) => {
        console.log(data);
        setDefaultCategories(data);
      })
      .catch(() => {
        toast.error("Failed to fetch default categories");
      });
  }, []);

  const createDefaultCategories = useCallback(() => {
    axios
      .post("/categories/default", {
        userId: createdUserId,
        ids: selectedDefaultCategories,
      })
      .then(() => {
        window.location.href = "/login";
      })
      .catch(() => {
        toast.error("Failed to create default categories");
      });
  }, [createdUserId, selectedDefaultCategories]);

  return (
    <div className="flex flex-col bg-gray-100 p-28 rounded-xl gap-4">
      {page === 0 ? (
        <>
          <h1 className="text-2xl font-semibold">Register</h1>
          <input
            className="p-2 rounded-lg"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-2 rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-200 transition-all"
            onClick={onRegister}
          >
            Register
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">Select default categories</h1>
          {defaultCategories.map((category) => (
            <div key={category.id} className="flex gap-4">
              <input
                type="checkbox"
                checked={selectedDefaultCategories.includes(category.id)}
                onChange={() =>
                  setSelectedDefaultCategories((prev) =>
                    prev.includes(category.id)
                      ? prev.filter((id) => id !== category.id)
                      : [...prev, category.id]
                  )
                }
              />
              <p>{category.name}</p>
            </div>
          ))}
          <button className="p-2 rounded-lg bg-gray-50 hover:bg-gray-200 transition-all" onClick={() => createDefaultCategories()}>
            Done
          </button>
        </>
      )}
    </div>
  );
}

export default Register;
