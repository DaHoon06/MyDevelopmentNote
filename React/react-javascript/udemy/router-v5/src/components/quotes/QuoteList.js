import { Fragment } from 'react';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
import {useHistory, useLocation} from "react-router-dom";

const QuoteList = (props) => {
    const history = useHistory();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const isSortingAscending = query.get('sort') === 'asc';

    const sortQuotes = (quotes, ascending) => {
        return quotes.sort((quoteA, quoteB) => {
            if (ascending) return quoteA.id > quoteB.id ? 1 : -1
            else return quoteA.id < quoteB.id ? 1 : -1;
        });
    };

    const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);
    console.log(location)
    const changeSortingHandler = () => {
        history.push({
            pathname: location.pathname,
            search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`,
        });
    }

  return (
        <Fragment>
            <header className={classes.sorting}>
                <button onClick={changeSortingHandler}>Sort {isSortingAscending ? 'Descending' : 'Ascending'}</button>
            </header>
            <ul className={classes.list}>
                {sortedQuotes.map((quote) => (
                    <QuoteItem
                        key={quote.id}
                        id={quote.id}
                        author={quote.author}
                        text={quote.text}
                    />
                ))}
            </ul>
        </Fragment>
  );
};

export default QuoteList;
