import { withRouter } from "react-router-dom";

const WithRouterSample = ({ location, match, history }) => {
    return(
        <div>
            <h3>History</h3>
            <textarea
                value={JSON.stringify(location,null,2)}
                rows={7}
                readOnly={true} />
            <h3>match</h3>
            <textarea
                value={JSON.stringify(match,null,2)}
                rows={7}
                readOnly={true} />
            <button onClick={() => history.push('/')}>HOME</button>

        </div>
    );
};
export default withRouter(WithRouterSample);