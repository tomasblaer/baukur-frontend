import { useCallback, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Comparisons() {


  const getComparison = useCallback(() => {
    axios.get("/categories/comparison").then(({ data }) => {
      console.log(data);
    }).catch(() => {
      toast.error("Failed to fetch comparison");
    });

  }, []);

  useEffect(() => {
    getComparison();
  }, []);
  
}