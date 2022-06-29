import QuoteForm from "../components/quotes/QuoteForm";
import {useNavigate} from 'react-router-dom';

export const NewQuote = () => {
    //history -> navigate로 변경
    // const history = useHistory();
    const navigate = useNavigate();
    navigate('/welcome', {replace: true})

    const addQuoteHandler = (quotes) => {
        // history.push('/quotes')
        console.log('?')
    }

    return (
        <QuoteForm onAddQuote={addQuoteHandler}/>
    );
}