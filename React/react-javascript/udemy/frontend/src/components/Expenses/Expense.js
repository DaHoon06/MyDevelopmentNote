import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import './Expense.css'
import { useState } from "react";

const Expense = (data) => {
    const [filterYear, setFilterYear] = useState('2020');

    const filterChangeHandler = selectedYear => {
        console.log(selectedYear);
        setFilterYear(selectedYear);
    }
    return (
        <div>
            <ExpenseFilter selected={filterYear} onChageFilter={filterChangeHandler} />
            <Card className='expenses'>
                <ExpenseItem
                    title={data.items[0].title}
                    amount={data.items[0].amount}
                    date={data.items[0].date}
                />
                <ExpenseItem
                    title={data.items[1].title}
                    amount={data.items[1].amount}
                    date={data.items[1].date}
                />
                <ExpenseItem
                    title={data.items[2].title}
                    amount={data.items[2].amount}
                    date={data.items[2].date}
                />
                <ExpenseItem
                    title={data.items[3].title}
                    amount={data.items[3].amount}
                    date={data.items[3].date}
                />
            </Card>
        </div>
    );
}
export default Expense