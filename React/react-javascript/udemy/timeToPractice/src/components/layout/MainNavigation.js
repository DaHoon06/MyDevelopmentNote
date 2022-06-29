import classes from './MainNavigation.module.css';
import {NavLink} from "react-router-dom";

export const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <span className={classes.logo}>GREAT</span>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to='/quotes' activeClassName={classes.active} >All Quotes</NavLink>
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