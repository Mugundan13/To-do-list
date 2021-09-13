import './App.scss';
import {useSelector} from "react-redux";

import AllLists from "./Components/AllLists";
import AddListForm from "./Components/AddListForm";
import Header from "./Components/Header";
import AddCardForm from "./Components/AddCardForm";

function App() {
    const showCardForm = useSelector(state => state.showCardForm);
    
    return (
        <div className="App">
            <Header/>
            <AllLists/>
            <AddListForm/>
            {showCardForm.show && <AddCardForm listType={showCardForm.listType} />}
        </div>
    );
}

export default App;
