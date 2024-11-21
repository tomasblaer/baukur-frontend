import { BarChart, PieChart } from "@mui/x-charts";
import useUser from "../../components/hooks/UseUser";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { FaChartBar, FaChartPie, FaClipboard } from "react-icons/fa";

function Stats() {
  const user = useUser();
  const [expenses, setExpenses] = useState(undefined);
  const [keys, setKeys] = useState([]);
  const [selectedGraphDuration, setSelectedGraphDuration] = useState("3m");
  const [from, setFrom] = useState(
    moment().subtract(2, "months").startOf("month").toISOString()
  );
  const [selectedGraph, setSelectedGraph] = useState("bar");

  const getAllExpenses = useCallback(() => {
    axios.get(`expenses/graph?from=${from}&to=${moment().toISOString()}`).then(({ data }) => {
      if (selectedGraph === "bar") {
        const months = moment
          .monthsShort()
          .slice(moment(from).format("M") - 1, moment(moment().toISOString()).format("M"));
        const expensesParsed = months.map((month) => {
          return {
            month,
          };
        });
        const checkedCategories = new Set();
        const keys = [];
        data?.forEach((expense) => {
          const index = expensesParsed.findIndex(
            (key) => key.month === moment(expense.date).format("MMM")
          );
          expensesParsed[index] = {
            ...expensesParsed[index],
            [expense.categoryName.toLowerCase()]: expensesParsed[index]
              ?.category
              ? expensesParsed[index]?.category + expense.amount
              : expense.amount,
          };
          if (checkedCategories.has(expense.categoryName)) {
            return;
          } else {
            checkedCategories.add(expense.categoryName);
            keys.push({
              dataKey: expense.categoryName.toLowerCase(),
              label: expense.categoryName,
            });
          }
        });
        setKeys(keys);
        setExpenses(expensesParsed);
        return;
      } else if (selectedGraph === "pie") {
        const expensesParsed = [];
        const checkedCategories = new Set();
        data?.forEach((expense) => {
          if (checkedCategories.has(expense.categoryName)) {
            const index = expensesParsed.findIndex(
              (key) => key.label === expense.categoryName
            );
            expensesParsed[index] = {
              ...expensesParsed[index],
              value: expensesParsed[index]?.value + expense.amount,
            };
          } else {
            checkedCategories.add(expense.categoryName);
            expensesParsed.push({
              label: expense.categoryName,
              value: expense.amount,
            });
          }
        });
        console.log(expensesParsed);
        setExpenses(expensesParsed);
        return;
      }
    });
  }, [selectedGraph, from]);

  useEffect(() => {
    getAllExpenses();
  }, [selectedGraph, from]);

  return (
    <ProtectedRoute user={user}>
      <div className="border flex-col rounded-lg py-8 px-40 flex">
        {selectedGraph !== "comp" ? (
          <>
            {expenses?.length > 0 ? (
              <>
                <div className="flex h-fit justify-center gap-2">
                  <button
                    className={`transition-all w-20 h-12 ${
                      selectedGraph === "bar" ? "bg-pink-200" : ""
                    }`}
                    onClick={() => setSelectedGraph("bar")}
                  >
                    <FaChartBar size={20} className="m-auto" />
                  </button>
                  <button
                    className={`transition-all w-20 h-12 ${
                      selectedGraph === "pie" ? "bg-pink-200" : ""
                    }`}
                    onClick={() => setSelectedGraph("pie")}
                  >
                    <FaChartPie size={20} className="m-auto" />
                  </button>
                  <button
                    className={`transition-all w-20 h-12 ${
                      selectedGraph === "comp" ? "bg-pink-200" : ""
                    }`}
                    onClick={() => setSelectedGraph("comp")}
                  >
                    <FaClipboard size={20} className="m-auto" />
                  </button>
                </div>
                <hr className="my-2" />
                <div className="flex h-fit justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedGraphDuration("1m");
                      setFrom(moment().startOf("month").toISOString());
                    }}
                    className={`transition-all w-20 h-12 ${
                      selectedGraphDuration === "1m" ? "bg-pink-200" : ""
                    }`}
                  >
                    1m
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGraphDuration("3m");
                      setFrom(
                        moment()
                          .subtract(2, "months")
                          .startOf("month")
                          .toISOString()
                      );
                    }}
                    className={`transition-all w-20 h-12 ${
                      selectedGraphDuration === "3m" ? "bg-pink-200" : ""
                    }`}
                  >
                    3m
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGraphDuration("6m");
                      setFrom(
                        moment()
                          .subtract(5, "months")
                          .startOf("month")
                          .toISOString()
                      );
                    }}
                    className={`transition-all w-20 h-12 ${
                      selectedGraphDuration === "6m" ? "bg-pink-200" : ""
                    }`}
                  >
                    6m
                  </button>
                </div>
                {selectedGraph === "bar" ? (
                  <BarChart
                    dataset={expenses}
                    xAxis={[
                      {
                        dataKey: "month",
                        scaleType: "band",
                      },
                    ]}
                    series={keys}
                    width={window.innerWidth >= 2560 ? 600 : 400}
                    height={window.innerWidth >= 2560 ? 600 : 400}
                  />
                ) : (
                  selectedGraph === "pie" && (
                    <PieChart
                      series={[
                        {
                          data: expenses,
                        },
                      ]}
                      width={window.innerWidth >= 2560 ? 800 : 600}
                      height={window.innerWidth >= 2560 ? 400 : 300}
                    />
                  )
                )}
              </>
            ) : (
              <h1>No data</h1>
            )}
          </>
        ) : (
          <div>
            <h1>Comparison</h1>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default Stats;
