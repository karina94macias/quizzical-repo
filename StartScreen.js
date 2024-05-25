import React from "react"

export default function StartScreen(props) {
    return (
        <div className="start-container">
            <h1>Quizzical</h1>
            <h2>Try how much you know about random things</h2>
            <button 
                className="start-btn"
                onClick={props.startQuiz}
            >Start quiz</button>
        </div>
    )
}