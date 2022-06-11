import './App.css';
import Expense from "./components/Expenses/Expense";
import NewExpense from "./components/NewExpenses/NewExpense";
import { useState } from "react";

const DUMMY_EXPENSE = [
    {id: 'e1', title: 'Hello', amount: '500원', date: new Date(2022, 6, 8)},
    {id: 'e2', title: 'world', amount: '1,500원', date: new Date(2022, 6, 9)},
    {id: 'e3', title: 'react', amount: '2,500원', date: new Date(2022, 6, 10)},
    {id: 'e4', title: 'vue', amount: '1,500원', date: new Date(2022, 6, 10)},
]

const App = () => {
    const [expenses, setExpenses] = useState(DUMMY_EXPENSE);

    const addExpenseHandler = expense => {
        setExpenses((prevExpense) => {
            return [expense, ...prevExpense];
        });
    }
    return (
        <div className='expenses'>
            <NewExpense onAddExpense={addExpenseHandler} />
            <Expense items={expenses} />
        </div>

    );
}

export default App;
