import {NavLink, Route} from "react-router-dom";
import Profile from "./Profile";
import WithRouterSample from "../WithRouterSample";

const Profiles = () => {
    const style = {
        background: 'black',
        color: 'white'
    }
    return(
        <div>
            <h3>사용자</h3>
            <ul>
                <li>
                    <NavLink activeStyle={style}
                        to='/profile/test1'>test1</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={style}
                        to='/profile/test2'>test2</NavLink>
                </li>
            </ul>

            <Route
                path='/profiles'
                exact
                render={() => <div>사용자를 선택해주세요.</div>} />
            <Route path='/profiles/:username' component={Profile} />

            <WithRouterSample />
        </div>
    );
};

export default Profiles;

