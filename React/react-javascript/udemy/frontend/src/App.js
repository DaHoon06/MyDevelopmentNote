import './App.css';
import Expense from "./components/Expense";

function App() {
    const expenses = [
        {id: 'e1', title: 'Hello', amount: '500원', date: new Date(2022, 6, 8)},
        {id: 'e2', title: 'world', amount: '1,500원', date: new Date(2022, 6, 9)},
        {id: 'e3', title: 'react', amount: '2,500원', date: new Date(2022, 6, 10)},
        {id: 'e4', title: 'vue', amount: '1,500원', date: new Date(2022, 6, 10)},
    ]
    return (
        <div>
            <div className='expenses'>
                <Expense items={expenses} />
            </div>
        </div>
    );
}

export default App;
