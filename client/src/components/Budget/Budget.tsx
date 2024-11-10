import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
    const {budget,setBudget} = useContext(AppContext);
    // (async()=>{updateBudget( await fetchBudget())})();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newBudget, setNewBudget] = useState(budget);

    function handleSave(){
        setBudget(newBudget);
        updateBudget(newBudget);
        setEditMode(!editMode);
    }

    if(editMode){
        return (
            <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
                <div data-testid='budget'>Budget: $</div>
                <input type="text" onChange={(e)=>{
                    setNewBudget(Number(e.target.value));
                    }}
                    style={{ 
                        width: '120px',
                        marginRight: '10px' 
                    }}
                    className="form-control" 
                    />
                <button onClick={handleSave} className="btn btn-primary">Save</button>
            </div>
        );
    }
    return (
        <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
        <div data-testid='budget'>Budget: ${budget}</div>
        <button className="btn btn-secondary" onClick={(e)=>setEditMode(!editMode)}> Edit </button>
        </div>
    );
};

export default Budget;
