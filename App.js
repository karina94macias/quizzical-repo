import React from "react"
import StartScreen from "./StartScreen"
import QuestionsScreen from "./QuestionsScreen"
import {decode} from 'html-entities'

export default function App() {
    const [start, setStart] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [playAgain, setPlayAgain] = React.useState(false)
    
    function togglePlayAgain(){
        setPlayAgain(prevPlayAgain => !prevPlayAgain)
    }
    
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                const questionsData = data.results
                const questionsArray = questionsData.map(question => {
                    
                    const allAnswerArray = question.incorrect_answers
                    const correctAnswer = question.correct_answer
                    allAnswerArray.splice(Math.floor(Math.random()*(allAnswerArray.length+1)),0,correctAnswer)
                    const allAnswerArrayDecoded = allAnswerArray.map(answer => decode(answer))
                    
                    return ({
                        question: decode(question.question),
                        allAnswers: allAnswerArrayDecoded,
                        correctAnswer: decode(correctAnswer)
                    })
                })
                
                setQuestions(questionsArray) 
            })
    }, [playAgain])
    
    function startQuiz() {
        setStart(true)
    }
    
    return(
        <main>
            {start? 
                <QuestionsScreen questions={questions} togglePlayAgain={togglePlayAgain}/> : 
                <StartScreen startQuiz={startQuiz}/>}
        </main>
    )
}