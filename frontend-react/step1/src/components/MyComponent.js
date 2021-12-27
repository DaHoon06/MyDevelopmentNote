import React from "react";
import PropTypes from 'prop-types';

const MyComponent = ({ name, favoriteNumber ,children }) => { // 구조분해 문법
    //const { name, children } = props; => 비구조화 할당

    return(
        <div>
            <b>PROPS TEST : {name}</b>
            {children}, <br/>
            {favoriteNumber}
        </div>
    )
};

{/* props 임의 지정 */}
MyComponent.defaultProps = {
    name: '전다훈'
}

MyComponent.ReactPropTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
};


export default MyComponent;