import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { createExpense } from "../../utils/expense-utils";
const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
    const {expenses,setExpenses} = useContext(AppContext);
  // Exercise: Create name and cost to state variables
    const [name,setName] = useState<string>('');
    const [cost,setCost] = useState<string>('0');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Exercise: Add add new expense to expenses context array
    const newExpense: Expense = {
        id: String(expenses.length +1),
        description: name,
        cost: Number(cost)
    }
    createExpense(newExpense);
    setExpenses([newExpense,...expenses]);
    //console.log(`newExpense: ${newExpense}`);
    console.log( expenses);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            data-testid='name'
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e)=>{
                console.log(`Change triggered: ${e.target.value}`)
                setName(e.target.value)}}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            data-testid='cost'
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e)=>setCost(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
