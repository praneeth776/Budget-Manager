import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    // TO DO: Implement updateBudget function
    const { budget: newBudget } = body; // Extract new budget from request body

    // Validate the new budget
    if (typeof newBudget !== 'number') {
        return res.status(400).send({ error: "Budget must be a number" });
    }

    // Update the budget amount
    budget.amount = newBudget; // Update the existing budget object's amount property
    console.log(`Updated budget to ${budget.amount}, ${newBudget}`);

    // Send back the updated budget
    res.status(200).send({ budget: budget.amount });
}
