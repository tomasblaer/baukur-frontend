import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

function CategoryPanel({ categories, fetchCategories, setSelectedCategory }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const onSubmit = useCallback(() => {  
    axios.post('/categories', {
      name,
      description
    })
      .then(({ data }) => {
        toast.success(`Created category ${data.name}`);
        fetchCategories();
      })
      .catch(error => {
        toast.error('Failed to create category');
        console.error(error)
      });
  }, [name, description, fetchCategories]);


  return (
    <div>
      <div className="flex my-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="outline-none border h-10 rounded-l-lg p-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="outline-none border h-10 p-2"
        />
        <button onClick={onSubmit} className="rounded-none rounded-r-lg h-10">
          Add category
        </button>
      </div>
      <div className="rounded-lg border">
        <div>
          <h1 className="border-b text-3xl font-semibold p-6">Categories</h1>
        </div>
        <div className="flex flex-col h-[60vh] bg-gray-50 rounded-b-lg overflow-scroll no-scrollbar">
          {categories.map((category, index) => (
            <>
              <button
                key={category.id}
                className={`bg-gray-100 rounded-none ${
                  index === categories.length - 1 && "rounded-b-lg"
                } hover:bg-gray-50 transition-all duration-300 min-h-16`}
                onClick={() => setSelectedCategory(category)}
              >
                <h2 className="text-lg" >{category.name}</h2>
                <p className="text-sm" >{category.description}</p>
              </button>
              <hr />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPanel;
