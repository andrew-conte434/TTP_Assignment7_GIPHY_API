import './App.css';
import SearchField from './SearchField.js';
import GifCard from './GifCard.js';
import {useEffect, useState} from 'react'

function App() {
  const [gifs, setGifs] = useState(null);
  
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GIPHY_API_KEY
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
    .then((res) => res.json())
    .then((obj) => {
      setGifs(obj.data)
    })
    .catch((err) => {
      alert("No results found")
    })
  }, [])

  // if(input !== "" && !checkData){
  //   fetchDataFromAPI(input, [gifs, setGifs]);
  //   setCheckData(true);
  // }

  // const getRating = (e) => {
  //   console.log(e.value);
  // }
  return (
    <div className="display">
      <h1 className="header">Top GIFs right now!</h1>
      <div className="trending">
        {gifs && gifs.map((gif, i) => {
            return (
              <GifCard key = {gif.id}
                      id = {gif.id}
                      url = {gif.url}
                      className="trending"/>
            )
        })}
      </div>
      <div className="inputs">
          <SearchField />
      </div>
      <footer>
       <small> © 2022 Andrew Conte, Yahia Elhag, Halid Adechinan </small>
      </footer>
    </div>
    
  );
}

// async function fetchDataFromAPI(input, [gifs, setGifs]){
//   const apiKey = process.env.REACT_APP_GIPHY_API_KEY
//   let path = "";
//   if(input === "Trending"){
//     path = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`
//   } else if(input === "random"){
//     path = `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
//    } else {
//      path = `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=${apiKey}`
//     }
  

//   try {
//       const response = await fetch(path);
//       const data = await response.json();
//       setGifs(data.data);
//     } catch(e){
//       console.log("Invalid Input")
//     }

// }
export default App;
