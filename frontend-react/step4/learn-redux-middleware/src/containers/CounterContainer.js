import { connect } from "react-redux";
import { increaseAsync, decreaseAsync } from "../modules/counter";
import Counter from "../components/Counter";

const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
    return(
        <Counter
            number={number}
            onDecrease={decreaseAsync}
            onIncrease={increaseAsync}
        />
    );
};

export default connect(
    state => ({
        number: state.counter
    }),
    {
        increaseAsync,
        decreaseAsync
    }
)(CounterContainer);