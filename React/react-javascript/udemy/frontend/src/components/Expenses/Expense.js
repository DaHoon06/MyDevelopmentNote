import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import './Expense.css'
import { useState } from "react";

const Expense = (data) => {
    const [filterYear, setFilterYear] = useState('2020');

    const filterChangeHandler = selectedYear => {
        setFilterYear(selectedYear);
    }
    return (
        <div>
            <ExpenseFilter selected={filterYear} onChageFilter={filterChangeHandler} />
            <Card className='expenses'>
                {
                    data.items.map((expense) =>
                        <ExpenseItem
                            key={expense.id}
                            title={expense.title}
                            amount={expense.amount}
                            date={expense.date} />)
                }
            </Card>
        </div>
    );
}
export default Expense