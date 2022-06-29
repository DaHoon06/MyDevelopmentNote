import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
    { id: 'q1', author: 'MAX', text: 'Learning React is Fun!' },
    { id: 'q2', author: 'MIN', text: 'Learning React is Ang!' },
    { id: 'q3', author: '어쩔', text: 'Learning React is Ing!' },
];

export const QuoteDetail = () => {
    const match = useRouteMatch();

    const params = useParams();
    const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
    console.log(match)
    if (!quote) return <p>NO ITEMS</p>

    return (
      <>
          <HighlightedQuote text={quote.text} author={quote.author} />
          <Route path={`${match.path}`} exact>
              <div className='centered'>
                  <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
              </div>
          </Route>
          <Route path={`${match.path}/comments`}>
                <Comments />
          </Route>
      </>
    )
}