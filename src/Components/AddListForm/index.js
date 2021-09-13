import { useState, useRef, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";

import "./AddListForm.scss";

const AddListForm = (props) => {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const showForm = useSelector(state => state.showListForm);
    const allLists = useSelector(state => state.allLists);

    const [listTitle, setListTitle] = useState('')
    const listtTitleOnChange = (event) => {
        setListTitle(event.target.value)
    }

    const closeShowAddListForm = () => {
        dispatch({type: "HIDELISTFORM"})
    }

    const addList = (event) => {
        event.preventDefault();
        const data = allLists.find(list => list.title === listTitle.trim())
        if (!data) {
            dispatch({type: "ADDLIST", payload: listTitle.trim()})
            setListTitle("")
            closeShowAddListForm()
        } else {
            alert("The List title already exists!")
        }  
    }
    useEffect(() => {
        if(showForm) {
            inputRef.current.focus();
        }
    }, [showForm])
    
    return (
        <div>
            {showForm && <div className="overlay"></div>} 
            {showForm && <div className="formContent">
                <h2>Add List</h2>
                <form onSubmit={addList}>
                    <p>Title:</p>
                    <input type="text" value={listTitle} onChange={listtTitleOnChange} required ref={inputRef}/>
                    <div className="buttons">
                        <button type="submit" className="add">Add</button>
                        <button onClick={closeShowAddListForm} className="cancel">Cancel</button>
                    </div>
                </form>
            </div>}
        </div>
    )
}

export default AddListForm;