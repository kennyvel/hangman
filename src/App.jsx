import React from "react"
import { languages } from "./languages"
import { clsx } from 'clsx'
 
export default function Hangman() {
    const [currentWord, setCurrentWord] = React.useState("react")
    const [currentGuesses, setCurrentGuesses] = React.useState([])

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuess(letter) {
        // TODO: Add buttons text (letter) to the letter elements array to be displayed
        // Only add the guess if it isn't already in the array
        setCurrentGuesses(currentGuesses => 
            currentGuesses.includes(letter) ?
                currentGuesses :
                [...currentGuesses, letter]
        )
    }
    
    // Map over languages and display each one as a span to display amount of lives/guesses
    const languageElements = languages.map((language) => {
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        return (
            <span
                key={language.name}
                style={styles} 
                className="language"
            >
                {language.name}
            </span>
        )
    })

    // Map over the letters of the word into an array of letters and display each one as a span
    const letterElements = currentWord.split("").map((letter, index) => {
        return (
            <span
                key={index}
                className="letter"
            >
                {/* TODO: Prevent the letters from the word from being rendered. Only rendered at the moment for testing */}
                {letter.toUpperCase()}
            </span>
        )
    })

    // Map over alphabet and display it as a keyboard
    const keyboard = alphabet.split("").map((letter) => {
        const isGuessed = currentGuesses.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        // Using clsx to conditionally add class names to the button for the background color
        // Will now turn the button green on correct guesses and red on incorrect guesses
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        return (
            <button
                key={letter}
                className={className}
                onClick={() => addGuess(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
            </header>
            {/* Using sections is likely more syntactically correct than using div */}
            <section className="game-status">
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </section>
            <section className="language-list">
                {languageElements}
            </section>
            <section className="word-guess">
                {letterElements}
            </section>
            <section className="keyboard">
                {keyboard}
            </section>
            <button className="new-game">New Game</button>
        </main>
    )
}
