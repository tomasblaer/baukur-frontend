import { useEffect } from "react";

function ExpensePanel({ selectedCategory }) {

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);


  return (
    <div className={`bg-gray-50 rounded-lg transition-widthv duration-300 ${selectedCategory ? 'w-96' : 'w-0'} `}>

    </div>
  )

}

export default ExpensePanel;