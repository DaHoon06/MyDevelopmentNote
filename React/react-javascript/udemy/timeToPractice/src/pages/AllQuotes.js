import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
    { id: 'q1', author: 'MAX', text: 'Learning React is Fun!' },
    { id: 'q2', author: 'MIN', text: 'Learning React is Ang!' },
    { id: 'q3', author: '어쩔', text: 'Learning React is Ing!' },
];

export const AllQuotes = () => {
    return <QuoteList quotes={DUMMY_QUOTES} />
};