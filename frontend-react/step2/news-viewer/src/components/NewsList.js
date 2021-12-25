import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=1bba1fb2914640518822acd0b3f116c3`
        );
    },[category]);

    if(loading){
        return <NewsListBlock>대기중....</NewsListBlock>;
    }
    // map을 사용하여 데이터를 불러오기전에 반드시 null Check를 진행해야한다.
    // 그렇지 않으면 렌더링 과정에서 오류 발생 ( null에는 map이 존재하지 않기 때문에 )
    if(!response) {
        return null;
    }
    if(error){
        return <NewsListBlock>에러 발생 !!</NewsListBlock>
    }
    const { articles } = response.data;
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;