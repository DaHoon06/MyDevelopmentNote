import Responsive from "../components/common/Responsive";
import EditorContainers from "../containers/write/EditorContainers";
import TagBoxContainer from "../containers/write/TagBoxContainer";
import WriteActionButtonContainer from "../containers/write/WriteActionButtonContainer";

const WritePage = () => {
    return (
        <Responsive>
            <EditorContainers />
            <TagBoxContainer />
            <WriteActionButtonContainer />
        </Responsive>
    )
};
export default WritePage;