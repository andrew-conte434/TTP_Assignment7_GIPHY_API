import React from 'react'

export default function GifCard(props) {
    const embedURL = "https://giphy.com/embed/"
    return (
        <div>
             <iframe src={embedURL + props.id} width="480" height="480" frameBorder="0" 
      className="giphy-embed" allowFullScreen></iframe>
        </div>
    )
}