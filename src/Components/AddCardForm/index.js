import { useState, useRef, useEffect } from 'react';
import {useDispatch} from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import "../AddListForm/AddListForm.scss";

const AddCardForm = (props) => {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const [cardData, setCardData] = useState({
        id: uuidv4(),
        listType: props.listType,
        title: "",
        description: ""
    });

    const set = name => {
        return ({ target: { value } }) => {
          setCardData(oldValues => ({...oldValues, [name]: value }));
        }
    };

    const closeCardForm = () => {
        dispatch({type: "HIDECARDFORM"})
    }

    const addCard = (event) => {
        event.preventDefault();
        dispatch({type: "ADDCARD", payload: cardData});
        closeCardForm();
        setCardData(oldState => ({
            ...oldState,
            title: "",
            description: "",
        }))
    }
    useEffect(() => {
        inputRef.current.focus();
    }, [])
    return (
        <div>
            <div className="overlay"></div>
            <div className="formContent">
                <h2>Add Card</h2>
                <form onSubmit={addCard}>
                    <p>Title:</p>
                    <input type="text" value={cardData.title} onChange={set("title")} placeholder="Card title" required ref={inputRef}/>
                    <p>Description:</p>
                    <textarea type="text" value={cardData.description} onChange={set("description")} rows="5" placeholder="Card desc"/>
                    <div className="buttons">
                        <button type="submit" className="add">Add</button>
                        <button onClick={closeCardForm} className="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCardForm;