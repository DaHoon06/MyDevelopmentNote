import classes from './MainNavigation.module.css';
import {NavLink,} from "react-router-dom";

export const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <span className={classes.logo}>GREAT</span>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <!-- activeClassName => 에서 직업 확인하는 걸로 수정 됨 (받는 navData 안에 isActive 속성이 있다.) -->
                        <NavLink to='/quotes' className={(navData) => navData.isActive ? classes.active : ''} >All Quotes</NavLink>
                    </li>
                    <li>
                        <NavLink to='/new-quote' activeClassName={classes.active} >add a Quotes</NavLink>
                    </li>
                    <li>
                        <NavLink to='/' activeClassName={classes.active} >All</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}