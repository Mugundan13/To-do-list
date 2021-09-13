import { useState } from "react";
import { useSelector } from "react-redux";

import "./Search.scss";


let timerId;
const Search = (props) => {
    const cards = useSelector(state => state.allCards);
    const [results, setResults] = useState([]);

    const getSearchResults = (searchTerm) => {
        let searchResults = []
        if (searchTerm.length > 0) {
            searchResults = cards.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()) || card.description.toLowerCase().includes(searchTerm.toLowerCase()))
        }
        setResults(searchResults);
    }

    const searchDebounce = (event) => {
        clearTimeout(timerId);
        timerId  =  setTimeout(() => getSearchResults(event.target.value), 400);
    }

    return (
        <div className="searchContainer">
            <div className="search"><input type='search' placeholder="Search" onChange={searchDebounce}/></div>
            {results.length > 0 && <ul className="searchResults">
                {results.map(card => <li key={card.id} className="seachCard">
                    <p className="title">{card.title}</p>
                    <p className="description">{card.description}</p>
                    <span className="cardList">{card.listType.replace(/-/g, " " )}</span>
                </li>)}
            </ul>}
        </div>
    )
}

export default Search;