import logo from './logo.svg';
import './App.css';
import SearchField from './SearchField.js';
import GifCard from './GifCard.js';
import {useEffect, useState} from 'react'

function App() {
  const [input, setInput] = useState("Trending");
  const [gifs, setGifs] = useState(null);
  const [checkData, setCheckData] = useState(false);
  

  useEffect(() => {
    fetchDataFromAPI(input, [gifs, setGifs]);
    setCheckData(true);
  }, [])

  const handleCallback = (searchInput) => {
    setInput(searchInput);
    console.log(searchInput);
    setCheckData(false);
  }

  if(input !== "" && !checkData){
    fetchDataFromAPI(input, [gifs, setGifs]);
    setCheckData(true);
  }

  const getRating = (e) => {
    console.log(e.value);
  }
  

  
  return (
    <div className="display">
    <div className="inputs">
      <SearchField parentCallback = {handleCallback}/>
    </div>

    <h1>Searching Up...{input}</h1>

    <div className="displayGifs">
      <GifCard data = {gifs} didUserEnterInfo = {checkData}/>
    </div>
    </div>
    
  );
}

async function fetchDataFromAPI(input, [gifs, setGifs]){
  let path = "";
  if(input === "Trending"){
    path = "http://api.giphy.com/v1/gifs/trending?api_key=SnHGtiLWPxHxIUqxzbkjYco0B1oKeeNH&limit=15";
  } else {
    path = "http://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=SnHGtiLWPxHxIUqxzbkjYco0B1oKeeNH&limit=15";
  }

  try {
      const response = await fetch(path);
      const data = await response.json();
      setGifs(data);
    } catch(e){
      console.log("Invalid Input")
    }

}




export default App;
