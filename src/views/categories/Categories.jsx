import axios from "axios";
import { useCallback } from "react";

function Categories() {


  const getCategories = useCallback(() => {
    axios.get('/categories', {
      withCredentials: true,
    })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      });
  }, []);

  return (
      <div>
          <button onClick={getCategories}>Get categories</button>
      </div>
  );
}

export default Categories;