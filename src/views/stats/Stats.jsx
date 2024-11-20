import { BarChart } from "@mui/x-charts";
import useUser from "../../components/hooks/UseUser";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function Stats() {
  const user = useUser();
  const [expenses, setExpenses] = useState(undefined);

  const getAllExpenses = useCallback((from = null, to = null) => {
    console.log(from);
    if (!from) {
      from = moment().subtract(2, "months").startOf("month").toISOString();
    }
    if (!to) {
      to = moment().toISOString();
    }
    axios.get(`expenses/graph?from=${from}&to=${to}`).then(({ data }) => {
      
      setExpenses(data);
    });
  }, []);

  useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    <ProtectedRoute user={user}>
      <div className="border rounded-lg py-8 px-40 flex">
        {expenses && (
        <>
          <div className="flex h-fit">
            <button>7d</button> {/* todo */}
            <button onClick={() => getAllExpenses(moment().startOf("month").toISOString())}>1m</button>
            <button onClick={() => getAllExpenses(moment().subtract(2, "months").startOf("month").toISOString())}>3m</button>
            <button onClick={() => getAllExpenses(moment().subtract(5, "months").startOf("month").toISOString())}>6m</button>
            <button>1y</button> {/* todo */}
          </div>
          <BarChart
            xAxis={[
              {
                data: expenses.dates,
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: expenses.amounts,
                color: "pink",
                valueFormatter: (value) => `${value} kr.`,
              },
            ]}
            width={800}
            height={800}
          />
        </> 
        )}
      </div>
    </ProtectedRoute>
  );
}

export default Stats;
