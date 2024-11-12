import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";
import { resolve } from "path";
import { rejects } from "assert";
import { error } from "console";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body as { id: string, cost: number, description: string };


    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
    res.status(201).send({ id, description, cost });
}

export async function deleteExpense(req: Request, res: Response, db : Database) {
    // TO DO: Implement deleteExpense function
    const id = req.params.id;
    if(!id){
        return res.status(400).send({error: `Missing required fields`});
    }
    try{
        await db.run('DELETE FROM expenses WHERE id = ?;',[id]);
    } catch{
        return res.status(400).send({ error: `Delete operation failed` });
    }
}

/**
 * 
 * @param req - Get request
 * @param res - Send all the data in the table expenses
 * @param db - The database with table expenses
 */
export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        console.log(`Function called: getExpenses ${req}`);
        const data: Expense[] = await db.all("SELECT * FROM expenses;", (err: Error | null, rows: Expense[]) => {
            if(err) throw err;
            console.log(rows);
        });
  
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ error: `Expenses could not be fetched` });
    }
  }