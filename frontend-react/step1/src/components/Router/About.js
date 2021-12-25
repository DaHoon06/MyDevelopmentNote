import React from "react";
import qs from 'qs';

const About = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true // 문자 앞의 ? 를 생략한다.
    });
    const showDetail = query.detail === 'true' //쿼리의 파싱 결과 값은 문자열
    return(
        <div>
            <h2>소개</h2>
            <p>리액트 라우트 기초</p>
            {showDetail && <p> detail 값은 true 로 설정하였다. </p>}
        </div>
    );
};

export default About;