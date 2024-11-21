import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEyeSlash, FaSpinner, FaTrash } from "react-icons/fa";
import ConfirmationModal from "../ConfirmationModal";

function CategoryPanel({
  categories,
  fetchCategories,
  setSelectedCategory,
  selectedCategory,
  loading,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(false);
  const [categoryToHide, setCategoryToHide] = useState(false);

  const onSubmit = useCallback(() => {
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    axios
      .post("/categories", {
        name,
        description,
      })
      .then(({ data }) => {
        toast.success(`Created category ${data.name}`);
        setName("");
        setDescription("");
        fetchCategories();
      })
      .catch((error) => {
        toast.error("Failed to create category");
        console.error(error);
      });
  }, [name, description, fetchCategories]);

  const editCategory = useCallback(() => {
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    axios
      .patch("/categories", {
        name,
        description,
        id: selectedCategory?.id,
        defaultCategoryId: selectedCategory?.defaultCategoryId,
      })
      .then(() => {
        toast.success(`Edited category ${name}`);
        setName("");
        setDescription("");
        fetchCategories();
      })
      .catch((error) => {
        toast.error("Failed to edit category");
        console.error(error);
      });
  }, [name, description, selectedCategory?.id, selectedCategory?.defaultCategoryId, fetchCategories]);

  const deleteCategory = useCallback(
    (category) => {
      axios
        .delete(`/categories?id=${category.id}`)
        .then(() => {
          toast.success(`Deleted category ${category.name}`);
          setCategoryToDelete(null);
          if (selectedCategory?.id === category.id) {
            setSelectedCategory(null);
          }
          fetchCategories();
        })
        .catch((error) => {
          toast.error("Failed to delete category");
          console.error(error);
        });
    },
    [fetchCategories, selectedCategory?.id, setSelectedCategory]
  );

  const hideCategory = useCallback(
    (category) => {
      axios
        .patch(`/categories/hide?id=${category.id}`)
        .then(() => {
          toast.success(`Hid category ${category.name}`);
          setCategoryToHide(null);
          if (selectedCategory?.id === category.id) {
            setSelectedCategory(null);
          }
          fetchCategories();
        })
        .catch((error) => {
          toast.error("Failed to hide category");
          console.error(error);
        });
    },
    [fetchCategories, selectedCategory?.id, setSelectedCategory]
  );

  useEffect(() => {
    setSelectedCategory(categories.find((c) => c.id === selectedCategory?.id));
  }, [categories, selectedCategory?.id, setSelectedCategory]);

  useEffect(() => {
    setName(selectedCategory?.name || "");
    setDescription(selectedCategory?.description || "");
  }, [selectedCategory]);

  const onSetSelectedCategory = useCallback(
    (e, category) => {
      if (
        selectedCategory?.id === category.id &&
        !(
          e.target?.nearestViewportElement?.id === "trash" ||
          e.target?.id === "trash"
        )
      ) {
        setSelectedCategory(null);
      } else {
        setSelectedCategory(category);
      }
    },
    [selectedCategory?.id, setSelectedCategory]
  );

  return (
    <>
      <div className="flex my-2 col-start-1 mt-auto">
        <input
          type="text"
          placeholder="Name"
          value={name}
          minLength={1}
          onChange={(e) => setName(e.target.value)}
          disabled={selectedCategory?.defaultCategoryId}
          className="outline-none border h-10 rounded-l-lg p-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="outline-none border h-10 p-2"
        />
        <button
          onClick={() => (selectedCategory ? editCategory() : onSubmit())}
          className="rounded-none rounded-r-lg h-10"
        >
          {selectedCategory ? "Edit category" : "Add category"}
        </button>
      </div>
      <div className="rounded-lg relative border col-start-1 h-fit">
        <div className={`w-full absolute flex h-full bg-gray-200 rounded-lg transition-all duration-300 ${loading ? 'opacity-30 z-50' : 'opacity-0 -z-50'}`}>
          {loading && <FaSpinner className="m-auto animate-spin static w-fit h-fit" size={80} />}
        </div>
        <div>
          <h1 className="border-b text-3xl font-semibold p-6">Categories</h1>
        </div>
        <div className="flex flex-col h-[40vh] 4xl:h-[55vh] transition-all bg-gray-50 rounded-b-lg overflow-scroll no-scrollbar">
          {categories.map((category) => (
            <>
              <button
                key={category.id}
                className={`bg-gray-100 rounded-none min-h-20 hover:bg-gray-200 transition-all duration-300`}
                onClick={(e) => onSetSelectedCategory(e, category)}
              >
                <div className="flex justify-between">
                  <div
                    className="my-auto"
                    id="trash"
                    onClick={() => setCategoryToHide(category)}
                  >
                    <FaEyeSlash
                      id="trash"
                      className="ml-auto opacity-30 hover:opacity-70"
                      onClick={() => setCategoryToHide(category)}
                    />
                  </div>
                  <div className="mx-auto">
                    <h2 className="text-lg">{category.name}</h2>
                    <p className="text-sm">{category.description}</p>
                  </div>
                  <div
                    className="my-auto"
                    id="trash"
                    onClick={() => setCategoryToDelete(category)}
                  >
                    <FaTrash
                      id="trash"
                      className="ml-auto opacity-30 hover:opacity-70"
                      onClick={() => setCategoryToDelete(category)}
                    />
                  </div>
                </div>
              </button>
              <hr />
            </>
          ))}
        </div>
        <ConfirmationModal
          title="Delete category"
          message={`Are you sure you want to delete ${categoryToDelete?.name}?`}
          isOpen={!!categoryToDelete}
          setIsOpen={setCategoryToDelete}
          confirmationCallback={() => deleteCategory(categoryToDelete)}
        />
        <ConfirmationModal
          title="Hide category"
          message={`Are you sure you want to hide ${categoryToHide?.name}?`}
          isOpen={!!categoryToHide}
          setIsOpen={setCategoryToHide}
          confirmationCallback={() => hideCategory(categoryToHide)}
        />
      </div>
    </>
  );
}

export default CategoryPanel;
