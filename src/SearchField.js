import logo from './logo.svg';
import * as React from 'react';
import * as DOM from 'react-dom';
import GifCard from './GifCard.js';
import { useState } from 'react';

function SearchField(props){

    const [input, setInput] = useState("");
    const [gifs, setGifs] = useState(null)
    let random = false
    let error = false

    const updateInput = (e) => {
        if(e.key === 'Enter'){
            setInput(e.target.value);
            props.parentCallback(e.target.value);
        }
    };

    const handleEnter = (e) => {
        random = false
        if(e.key === 'Enter'){
            e.preventDefault()
            fetchData(e)
        }
    }

    const handleSubmit = (e) => {
        random = false
        e.preventDefault()
        fetchData(e)
    }

    const handleRandom = (e) => {
        e.preventDefault()
        random = true
        fetchData(e)
    }

    const fetchData = async (e) => {
        const apiKey = process.env.REACT_APP_GIPHY_API_KEY
        let path
        path = random ? `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}` :
                        `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=${apiKey}`
        await fetch(path)
        .then((res) => res.json())
        .then((obj) => {
            error = false
            if(random){
                //Creates array if API call returns singular object
                let arr = []
                arr.push(obj.data)
                setGifs(arr)
            } else {
                setGifs(obj.data)
            }
        })
        .catch((err) => {
            error = true
        })
    }

    return (
        <div className="search-field">
            <form>
                <label htmlFor={"gif-input"}> Search Up A Gif: </label>
                <input type={"text"} 
                    name={"gif-input"} 
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleEnter}/>
                <input type={"button"} value={"Search"} onClick={handleSubmit}/>
                <button className="random-button" onClick={handleRandom}>Get a random GIF!</button>
            </form>


            {/* {gifs && <h2>Searching up... {input}</h2>} */}
            <div className='search-results'>
                {error ? <GifCard key = {1}
                                  id = {"UHAYP0FxJOmFBuOiC2"}/> : <></>}
                {console.log(gifs)}
                {gifs && gifs.map((gif, i) => {
                    console.log(gif.id)
                    return (
                        <GifCard key = {i}
                                id = {gif.id}/>
                    )
                })}
            </div>
        </div>
    );
}



export default SearchField;
