import logo from './logo.svg';
import {useEffect, useState} from 'react'
import './App.css';
import GifCard from './GifCard';
import { getByTitle } from '@testing-library/react';

function App() {
  const urlPathTrending = "http://api.giphy.com/v1/gifs/trending?api_key=SnHGtiLWPxHxIUqxzbkjYco0B1oKeeNH"
  const [gifs, setGifs] = useState(null)
  let link = "url"

  useEffect(() => {
    async function fetchData(){
      await fetch(urlPathTrending)
        .then((res) => res.json())
        .then((obj) => {
          setGifs(obj.data)
        })
        .catch(err => {
          console.log("not result")
        })
    }
   fetchData() 
  }, [])

  console.log(gifs)
  return (
    <div className="App">
     
      {gifs && gifs.map((gif, i) => {
        return (
          <GifCard key={i}
                   id={gif.id}
                   url={gif.url}/>
        )
      })}
    </div>
  );
}

export default App;
