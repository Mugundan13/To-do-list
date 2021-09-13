import {useDispatch} from "react-redux";

import "./header.scss";
import Search from "../Search";

const Header = (props) => {

    const dispatch = useDispatch();

    const showAddListForm = () => {
        dispatch({type: "SHOWLISTFORM"})
    }

    return (
        <header>
            <div className="leftHeader">
                <h1>To-Do List</h1>
                <Search/>
            </div>
            <button onClick={showAddListForm} title="Add New List">ADD LIST</button>
        </header>
    )
}

export default Header;