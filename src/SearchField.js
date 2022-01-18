import * as React from 'react';
import GifCard from './GifCard.js';
import { useState } from 'react';

function SearchField(props){

    const [input, setInput] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [gifs, setGifs] = useState(null)
    const [ratingFilter, setRatingFilter] = useState("g");

    let random = false

    const changeFilter = (e) => {setRatingFilter(e.target.value)};

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
        path = random ? `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}` :
                        `https://api.giphy.com/v1/gifs/search?q=${input}&api_key=${apiKey}`
                        console.log(path)
        try {
            const res = await fetch(path)
            const obj = await res.json()
            if(random){
                //Creates array if API call returns singular object
                setSearchTerm("Here's a random GIF!")
                let arr = []
                arr.push(obj.data)
                setGifs(arr)
            } else if(obj.data.length === 0){
                setSearchTerm("Sorry, we couldn't find that")
                let arr = []
                let errorGif = {id : "UHAYP0FxJOmFBuOiC2"}
                arr.push(errorGif)
                setGifs(arr)
            } else {
                // setSearchTerm(`Searching up... ${input}`)
                // console.log(obj)
                // setGifs(obj.data)
                // console.log(obj.data);
                
                setSearchTerm(`Searching up... ${input}`)
                let arr = [];

                for(let i = 0; i < obj.data.length; i++){
                    if(obj.data[i].rating == ratingFilter){
                        arr.push(obj.data[i]);
                    }
                }

                if(arr.length == 0){
                    setSearchTerm("Sorry, we couldn't find that");
                    let errorGif = {id : "UHAYP0FxJOmFBuOiC2"}
                    arr.push(errorGif);
                }
                
                setGifs(arr);
            }
        }
        catch(err){
            setSearchTerm("Sorry, we couldn't find that")
        }
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
                <label htmlFor={"rating"}> &nbsp;&nbsp;&nbsp;Filter Through Ratings: </label>
                <select name="rating" id="rating" onChange={(e) => changeFilter(e)}>
                    <option value="g">G</option>
                    <option value="pg">PG</option>
                    <option value="pg-13">PG-13</option>
                    <option value="r">R</option>
                </select>
            </form>


            {gifs && <h2>{searchTerm}</h2>}
            <div className='search-results'>
                {gifs && gifs.map((gif, i) => {
                    return (
                        <GifCard key = {i}
                                 id = {gif.id} />
                    )
                })}
            </div>
        </div>
    );
}



export default SearchField;
