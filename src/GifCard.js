import logo from './logo.svg';
import * as React from 'react';
import * as DOM from 'react-dom';
import SearchField from './SearchField.js';
import { useEffect } from 'react';


function GifCard(props){
    return <img src={`https://i.giphy.com/media/${props.id}/giphy.gif`}/>
}

// function GifCard(props){
    
//     const cards = new Array();
//     const gifs = props.data;
//     traverseData(gifs, cards, props.didUserEnterInfo);
//     return <h1>{cards}</h1>
// }

// function traverseData(gifs, cards, isInputValid){
//     if(isInputValid && gifs != null){
//         const arr = gifs.data;
//         for(let i = 0; i < arr.length; i++){
//             const link = "https://i.giphy.com/media/" + arr[i].id + "/giphy.gif";       
//             cards.push(<img src={link} key={"img0"+i} ></img>);
//         }  
        
//         if(arr.length == 0){
//             cards.push("No Results Found");
//         }
//     } else {
//         cards = new Array();
//     }
// }

export default GifCard;