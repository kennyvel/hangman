import React from "react"
import { languages } from "./languages"
 
export default function Hangman() {
    const [currentWord, setCurrentWord] = React.useState("react")
    const [currentGuesses, setCurrentGuesses] = React.useState([])

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuess(buttonText) {
        // TODO: Add buttons text (letter) to the letter elements array to be displayed
        setCurrentGuesses(currentGuesses => [...currentGuesses, buttonText])
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
                {letter.toUpperCase()}
            </span>
        )
    })

    // Map over alphabet and display it as a keyboard
    const keyboard = alphabet.split("").map((letter) => {
        return (
            <button
                key={letter}
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
