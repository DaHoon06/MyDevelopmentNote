import {Route, Routes, Navigate} from "react-router-dom";
import {AllQuotes} from "./pages/AllQuotes";
import {QuoteDetail} from "./pages/QuoteDetail";
import {NewQuote} from "./pages/NewQuote";
import {Layout} from "./components/layout/Layout";
import {NotFound} from "./pages/NotFound";

function App() {
    /*
    * Redirect -> Navigate 로 변경
    *
    * 중첩 라우팅을 사용할 경우에도 Routes로 감싼 후 Route 사용 ( 하나여도 )
    *
    * /quotes/* ->  /quotes 로 시작되고 뒤에 어떤 경로가 붙던 AllQutes를 사용
    *
    *
    *
    *
    * */
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Navigate to='' />} replace />
                <Route path='/quotes/*' element={<AllQuotes />} />
                <Route path='/quotes/:quoteId' element={ <QuoteDetail />} />
                <Route path='/new-quote/*' element={<NewQuote />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

export default App;
