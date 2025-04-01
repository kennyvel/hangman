import React from "react"
import { languages } from "./languages"
 
export default function Hangman() {
    const [currentWord, setCurrentWord] = React.useState("react")
    // Map over the letters of the word into an array of letters and display
    // each one as a span

    const letterElements = [...currentWord].map((letter, index) => {
        return (
            <span
                key={index}
                className="letter"
            >
                {letter.toUpperCase()}
            </span>
        )
    })


    const languageElements = languages.map((language, index) => {
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
            </section>
            {/* <button className="confirm-guess"/> */}
        </main>
    )
}
