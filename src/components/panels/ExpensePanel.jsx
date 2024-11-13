import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { validateExpense } from "../../util/util";
import { FaX } from "react-icons/fa6";
import ConfirmationModal from "../ConfirmationModal";

function ExpensePanel({ selectedCategory, setSelectedCategory, fetchCategories }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const onSubmit = useCallback(() => {
    const validation = validateExpense({ name, comment, amount, date });
    if (validation !== null)  {
      toast.error(validation);
      return;
    }
    axios.post("/expenses", {
      name,
      comment,
      amount,
      date,
      categoryId: selectedCategory.id
      }).then(() => {
        toast.success("Expense added");
        setName("");
        setComment("");
        setAmount(0);
        setDate(new Date().toISOString().split("T")[0]);
        fetchCategories();
      }).catch((error) => {
        toast.error("Failed to add expense");
        console.error(error);
      });
    }, [name, comment, amount, date, selectedCategory?.id, fetchCategories]);

  const onSetSelectedExpense = useCallback(
    (e, expense) => {
      if (
        selectedExpense?.id === expense.id &&
        !(
          e.target?.nearestViewportElement?.id === "trash" ||
          e.target?.id === "trash"
        )
      ) {
        setSelectedExpense(null);
      } else {
        setSelectedExpense(expense);
      }
    },
    [selectedExpense, setSelectedExpense]
  );

  const deleteExpense = useCallback(
    (expense) => {
      axios
        .delete(`/expenses?id=${expense.id}`)
        .then(() => {
          toast.success(`Deleted expense ${expense.name}`);
          setExpenseToDelete(null);
          if (selectedExpense?.id === expense.id) {
            setSelectedExpense(null);
          }
          fetchCategories();
        })
        .catch((error) => {
          toast.error("Failed to delete expense");
          console.error(error);
        });
    },
    [fetchCategories, selectedExpense?.id]
  );

  useEffect(() => {
    setName(selectedExpense?.name || "");
    setComment(selectedExpense?.comment || "");
    setAmount(selectedExpense?.amount || 0);
    setDate(selectedExpense?.date || new Date().toISOString().split("T")[0]);
  }, [selectedExpense]);

  const onClosePanel = useCallback(() => {
    setSelectedCategory();
    setSelectedExpense();
  }, [setSelectedCategory, setSelectedExpense]);

  return (
    <>
      <div
        className={`my-2 col-start-2 row-start-1 grid w-full ${
          !selectedCategory && "opacity-0 pointer-events-none"
        } transition-all`}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          minLength={1}
          onChange={(e) => setName(e.target.value)}
          className="outline-none border h-10 rounded-tl-lg p-2 col-start-1 row-start-1"
        />
        <input
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="outline-none border h-10 p-2 rounded-tr-lg col-start-2 row-start-1"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="outline-none border h-10 p-2 col-start-1 row-start-2"
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          data-date-format="DD MMMM YYYY"
          className="outline-none border h-10 p-2 col-start-2 row-start-2"
        />
        <button onClick={onSubmit} className="rounded-none rounded-b-lg h-10 row-start-3 col-span-2">
          Add expense
        </button>
      </div>
      
      <div
        className={`bg-gray-50 rounded-lg ${
          selectedCategory && "border"
        } h-[784.33px] mt-auto transition-widthv duration-300 ${
          selectedCategory ? "w-full" : "w-0"
        } col-start-2 row-start-2 min-h-full`}
      >
        
        <div>
          <h1
            className={`${
              selectedCategory && "border-b scale-100"
            } transition-width rounded-t-lg text-3xl font-semibold p-6 bg-white`}
          >
            <div
              className={`opacity-0 ${
                selectedCategory && "!opacity-40 cursor-pointer"
              } text-xs  h-0 flex select-none`}
              onClick={() => onClosePanel()}
            >
              <p className="h-0 ml-auto"><FaX /></p>
            </div>
            {selectedCategory?.name}
          </h1>
          {selectedCategory?.expenses?.map((expense, index) => (
            <>
              <button
                key={expense.id}
                className={`bg-gray-100 rounded-none w-full h-20 ${
                  index === selectedCategory?.expenses?.length - 1 && "rounded-b-lg"
                } ${
                  expense.id === selectedExpense?.id && "!bg-gray-200"
                } hover:bg-gray-200 transition-all duration-300 min-h-16`}
                onClick={(e) => onSetSelectedExpense(e, expense)}
              >
                <div className="flex justify-between">
                  <div className="mx-auto">
                    <h2 className="text-lg">{`${expense.name} - ${expense.amount}ISK`}</h2>
                    <p className="text-sm">{expense.comment}</p>
                  </div>
                  <div
                    className="my-auto"
                    id="trash"
                    onClick={() => setExpenseToDelete(expense)}
                  >
                    <FaTrash
                      id="trash"
                      className="ml-auto opacity-30 hover:opacity-70"
                      onClick={() => setExpenseToDelete(expense)}
                    />
                  </div>
                </div>
              </button>
              <hr />
            </>
          ))}
        </div>
        <ConfirmationModal
          title="Delete expense"
          message={`Are you sure you want to delete ${expenseToDelete?.name}?`}
          isOpen={!!expenseToDelete}
          setIsOpen={setExpenseToDelete}
          confirmationCallback={() => deleteExpense(expenseToDelete)}
        />
      </div>
    </>
  );
}

export default ExpensePanel;
