import React from "react"

export default function QuestionsScreen(props) {
    
    const [inputData, setInputData] = React.useState({
        0: "",
        1: "",
        2: "",
        3: "",
        4: ""
    })
    const [answersChecked, setAnswersChecked] = React.useState(false)
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = React.useState(0)
    
    function handleChange() {
        const {name, value} = event.target
        setInputData(prevInputData => {
            return (
                {...prevInputData,
                [name]: value 
                }
            )
        })
    }
    
    const answersSelectedArray = Object.values(inputData)
    
    function checkingAnswers() {
        if(!answersChecked){
            answersSelectedArray.forEach((answer, i) => {
                if(answer === props.questions[i].correctAnswer){
                    setNumberOfCorrectAnswers(prevNumber => prevNumber + 1)
                }
            })
            setAnswersChecked(true)
        } else {
            setAnswersChecked(false)
            setNumberOfCorrectAnswers(0)
            props.togglePlayAgain()
        }
    }
    
    function setStylesAnswers(answer, correctAnswer) {
        let styles = {
            backgroundColor:""
        }
        if(answersChecked){
            if(answer === correctAnswer){
                styles.backgroundColor = "#94D7A2"
            }else{
                answersSelectedArray.includes(answer)?
                styles.backgroundColor = "#F8BCBC":
                styles.backgroundColor = "white"
            }
        }
        return styles
    }
    
    const questionsElements = props.questions.map(question => {
        const indexOfQuestion = props.questions.indexOf(question)
        const answersElement = question.allAnswers.map(answer => {
            return (
                <div
                    key={answer}
                >
                    <input 
                        type="radio"
                        id={answer}
                        name={indexOfQuestion}
                        value={answer}
                        checked={inputData[indexOfQuestion] === answer}
                        onChange={handleChange}
                    />
                    <label htmlFor={answer} style={setStylesAnswers(answer, question.correctAnswer)}>{answer}</label>
                </div>
            )
        })
        return (
            <div 
                className="question-container"
                key={indexOfQuestion}
            >
                <p className="question">{question.question}</p>
                <div className="answers-container">
                {answersElement}
                </div>
            </div>
        )
    })
    
    return (
        <div className="question-screen-container">
            {questionsElements}
            <div className="check-container">
                {answersChecked && <p className="score">You scored {numberOfCorrectAnswers}/5 correct answers</p>}
                <button 
                    className="check-btn"
                    onClick={checkingAnswers}
                    >
                {answersChecked? "Play again" : "Check answers"}
                </button>
            </div>
        </div>
    )
}
