import { useContext } from "react";
import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const {expenses,setExpenses} = useContext(AppContext);

  const handleDeleteExpense = (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    const id: string = currentExpense.id;
    setExpenses(expenses.filter(a => a.id!=id));
  };

  return (
    <li key={currentExpense.id} className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
