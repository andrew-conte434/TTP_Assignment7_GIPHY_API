import logo from './logo.svg';
import * as React from 'react';
import * as DOM from 'react-dom';

export default class SearchField extends React.Component {

    constructor(){
        super();
        this.state = {
            textInput: "",
            gifInfo: null
        }
    }

    updateValue(e){
        this.setState({textInput: e.target.value});

        if(e.key === 'Enter'){
            const finalInput = this.state.textInput;
            console.log("Entered Value: " + finalInput);
            this.fetchDataFromAPI(finalInput);
        }
    }

    async fetchDataFromAPI(input){
        const path = "http://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=SnHGtiLWPxHxIUqxzbkjYco0B1oKeeNH";


        try {
            const response = await fetch(path);
            const data = await response.json();
            this.setState({gifInfo: data});
            console.log(this.state.gifInfo);      
          } catch(e){
            console.log("Invalid Input")
          }
    }

    



    render(){
        return (
            <div className="search">
                <label htmlFor={"gif-input"}> Search Up A Gif: </label>
                <input type={"text"} name={"gif-input"} onKeyUp={(e) => this.updateValue(e)}/>
                
            </div>
        )
    }

    
}
