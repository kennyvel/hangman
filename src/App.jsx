import React from "react"
import { languages } from "./languages"
 
export default function Hangman() {
    const [currentWord, setCurrentWord] = React.useState("react")

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const handlePress = (buttonText) => {
        console.log(buttonText)
    }
    
    // Map over languages and display each one as a span to display amount of lives/guesses
    const languageElements = languages.map((language) => {
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        return (
            <span 
                style={styles} 
                className="language"
                key={language.name}
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
    const keyboard = alphabet.split("").map((letter, index) => {
        return (
            <button
                key={index}
                className="key"
                onClick={() => handlePress(letter)}
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
            {/* <button className="confirm-guess"/> */}
        </main>
    )
}
