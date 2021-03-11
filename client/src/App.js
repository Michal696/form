import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import {Form} from "./features/form/Form";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <Route path="/" exact component={Form}/>
                </Router>
            </header>
        </div>
    );
}

export default App;