import logo from './logo.svg';
import * as React from 'react';
import * as DOM from 'react-dom';
import GifCard from './GifCard.js';
import { useState } from 'react';

function SearchField(props){

    const [input, setInput] = useState("");

    const updateInput = (e) => {
        if(e.key === 'Enter'){
            setInput(e.target.value);
            props.parentCallback(e.target.value);
        }
    };

    return (
        <div className="search">
            <label htmlFor={"gif-input"}> Search Up A Gif: </label>
            <input type={"text"} name={"gif-input"} onKeyUp={(e) => updateInput(e)}/>
        </div>
    );
}



export default SearchField;
