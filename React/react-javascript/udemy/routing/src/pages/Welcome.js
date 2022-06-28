import { Route } from "react-router-dom";

export const Welcome = () => {
    return (
        <article>
            <h1>Welcome!</h1>
            <Route path='/welcome/new-user'>
                <p>CHILDREN PAGES</p>
            </Route>
        </article>
    );
};