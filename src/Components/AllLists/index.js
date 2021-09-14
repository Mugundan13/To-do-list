import { useState } from "react";
import {useSelector} from "react-redux";
import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";

import ToDOList from "../ToDoList";
import "./AllLists.scss"

const AllLists = (props) => {
    const dispatch = useDispatch();
    const lists = useSelector(state => state.allLists);
    const [sortBy, setSortBy] = useState(useSelector(state => state.sortByType) ||"Time-Descending");
    const sortByHandler = (event) => {
        dispatch({type: "SORTBY", payload: event.target.value});
        setSortBy(event.target.value);
    }

    const onDragEnd = result => {
        const {destination, source, draggableId} = result;

        if(!destination) {
            return;
        }
        if(destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        dispatch({type: "DROPCARD", payload: {id: draggableId, dropIntoType: destination.droppableId}})
    }

    return (
        <div className={`listsOuter ${!lists.length && 'noLists'}`}>
            {lists.length ? <div className="sortby"><span>Sort By:</span><select value={sortBy} onChange={sortByHandler}>
                <option value="Title-Ascending">Title-Ascending</option>
                <option value="Title-Descending">Title-Descending</option>
                <option value="Time-Ascending">Time-Ascending</option>
                <option value="Time-Descending">Time-Descending</option>
            </select></div> : ""}
            <DragDropContext
            onDragEnd={onDragEnd}
            >
                {lists.length ? lists.map((list, index) => <ToDOList key={index} listDetails={list}/>) : <p>No List Available</p>}
            </DragDropContext>
        </div>
    )
}

export default AllLists;