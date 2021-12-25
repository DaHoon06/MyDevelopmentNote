import classNames from "frontend-react/step1/src/components/CssSample/ClassNames";

classNames('one','two');
classNames('one',{two: true});
classNames('one',{two: false});
classNames('one',['two','three']);

const myClass = 'hello';
classNames('one',myClass,{myCondition: true});