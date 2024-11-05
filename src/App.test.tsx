import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { Expense } from './types/types';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('Create an Expense', () => {
    render(<App />);
    const newExpense: Expense = {
        id: '1',
        name: 'Groceries',
        cost: 112.74
    }
    const cost = screen.getByTestId('cost');
    const save = screen.getByText('Save');
    const name = screen.getByTestId('name');
    name.innerHTML = newExpense.name;
    cost.innerHTML = String(newExpense.cost);
    fireEvent.click(save);

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('112.74')).toBeInTheDocument(); 
    // expect(screen.getByText('Groceries')).toBeInTheDocument();
});

test('Delete an expense', ()=>{
    render(<App/>);
    const newExpense: Expense = {
        id: '1',
        name: 'Groceries',
        cost: 112.74
    }
    const cost = screen.getByTestId('cost');
    const save = screen.getByText('Save');
    const name = screen.getByTestId('name');
    name.innerHTML = newExpense.name;
    cost.innerHTML = String(newExpense.cost);
    fireEvent.click(save);
    name.innerHTML = '';
    cost.innerHTML = '0';

    const deleteButton = screen.getByText('x');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
    expect(screen.queryByText('112.74')).not.toBeInTheDocument();

});

test('Budget Balance Verification',()=>{
    render(<App/>);
    let budget = Number(screen.getByTestId('budget').innerHTML.substring(8,));
    let remaining = Number(screen.getByTestId('remaining').innerHTML.substring(11,));
    let spent_so_far = Number(screen.getByTestId('spent-so-far').innerHTML.substring(14,));

    expect(remaining+spent_so_far).toBe(budget);

    const newExpense: Expense = {
        id: '1',
        name: 'Groceries',
        cost: 112.74
    }
    const cost = screen.getByTestId('cost');
    const save = screen.getByText('Save');
    const name = screen.getByTestId('name');
    name.innerHTML = newExpense.name;
    cost.innerHTML = String(newExpense.cost);
    fireEvent.click(save);

    budget = Number(screen.getByTestId('budget').innerHTML.substring(8,));
    remaining = Number(screen.getByTestId('remaining').innerHTML.substring(11,));
    spent_so_far = Number(screen.getByTestId('spent-so-far').innerHTML.substring(14,));

    expect(remaining+spent_so_far).toBe(budget);

});
