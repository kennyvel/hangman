import React from "react"
import { languages } from "./languages"

/**
 * Goal: Build out the main parts of our app
 * 
 * Challenge: Add a header with the game title
 * and description. Startin' out easy 🙂🚶‍➡️
 */
export default function Hangman() {
    const languageElements = languages.map((language) => {
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        return (
            <span 
                style={styles} 
                className="langauge"
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
        </main>
    )
}
