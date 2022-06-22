import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import './Expense.css'
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

const Expense = (data) => {
    const [filterYear, setFilterYear] = useState('2020');

    const filterChangeHandler = selectedYear => {
        setFilterYear(selectedYear);
    }
    const filterExpenses = data.items.filter(expense => {
        return expense.date.getFullYear().toString() === filterYear;
    })

    return (
        <div>
            <Card className='expenses'>
                <ExpenseFilter
                    selected={filterYear}
                    onChageFilter={filterChangeHandler} />
                <ExpensesChart expenses={filterExpenses}/>
                <ExpensesList items={filterExpenses}/>
            </Card>
        </div>
    );
}
export default Expense