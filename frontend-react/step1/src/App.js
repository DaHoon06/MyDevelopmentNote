import React from "react";
import Home from "./components/Router/Home";
import About from "./components/Router/About";
import {Link, Route, Switch} from "react-router-dom";
import Profile from "./components/Router/Url/Profile";
import HistorySample from "./components/Router/Url/HistorySample";

const App = () => {
    return(
        <div>
            <Home />
            <ul>
                <li>
                    <Link to='/'>홈</Link>
                </li>
                <li>
                    <Link to='/about'>소개</Link>
                </li>
                <li>
                    <Link to='/profile/test1'>test1</Link>
                </li>
                <li>
                    <Link to='/profile/test2'>test2</Link>
                </li>
            </ul>

            <hr/>
            <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path={["/about","/info"]} component={About} />
                <Route path="/profile/:username" component={Profile} />
                <Route path="/history" component={HistorySample} />
                <Route
                    render={({location}) => (
                        <div>
                            <h2>이 페이지는 존재하지 않습니다.</h2>
                            <p>{location.pathname}</p>
                        </div>
                    )} />
            </Switch>

        </div>
    );
};

export default App;
