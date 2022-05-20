const Counter = ({ number, onIncrement, onDecrement }) => {
    return(
        <div>
            <h2>{number}</h2>
            <div>
                <button onClick={onIncrement}>+</button>
                <button onClick={onDecrement}>-</button>
            </div>
        </div>
    );
};

export default Counter;