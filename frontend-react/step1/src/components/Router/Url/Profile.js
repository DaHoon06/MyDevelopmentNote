import WithRouterSample from "../WithRouterSample";
import {withRouter} from "react-router-dom";

const data = {
    test1: {
        name: 'DH',
        description: 'React',
    },
    test2: {
        name: 'DH2',
        description: 'Vue',
    },
};

const Profile = ({match}) => {
    const {username} = match.params;
    const profile = data[username];
    if(!profile){
        return <div>존재하지 않는 사용자</div>;
    }
    return(
        <div>
            <h3>
                {username}({profile.name}
            </h3>
            <p>{profile.description}</p>
            <WithRouterSample />
        </div>
    )
}

export default withRouter(Profile);