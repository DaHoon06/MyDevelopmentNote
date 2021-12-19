import React,{Component} from "react";
import PropTypes from 'prop-types';

class ClassComponent extends Component{
    // 1. Class 내부에 prop과 type을 지정하는 방법
    static defaultProps = {
        name: '클래스 내부에서 지정'
    };
    static propTypes = {
        name: PropTypes.string,
        favoriteNumber: PropTypes.number.isRequired
    };
    render() {
        const { name, favoriteNumber, children } = this.props
        return (
            <div>
                <b>PROPS TEST : {name}</b>
                {children}, <br/>
                {favoriteNumber}
            </div>
        );
    }
}

// 2. Class 외부에서 prop과 type을 지정하는 방법
ClassComponent.defaultProps = {
    name: '클래스형 컴포넌트'
}

ClassComponent.propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
};

export default ClassComponent;