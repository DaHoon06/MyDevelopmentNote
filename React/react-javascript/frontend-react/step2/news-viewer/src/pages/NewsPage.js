import Categories from "../pages/Categories";
import NewsList from "../pages/NewsList";

const NewsPage = ({ match }) => {
    const category = match.params.category || 'all';

    return(
        <>
            <Categories />
            <NewsList category={category} />
        </>
    );
};

export default NewsPage;