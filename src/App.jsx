import React from "react"
import { languages } from "./languages"
import { clsx } from 'clsx'
import { getFarewellText } from "./utils"
 
/**
 * TODO:
 * - ✅ Farewell messages in status section
 * - Disable keyboard when the game is over
 * - Fix accessibility issues
 * - Make the new game button work
 * - Choose a random word from a list of words instead of hard coding the word
 * - Confetti drop when the user wins
*/

export default function Hangman() {
    // State values
    const [currentWord, setCurrentWord] = React.useState("react")
    const [currentGuesses, setCurrentGuesses] = React.useState([])

    // Derived values
    const wrongGuessesCount = currentGuesses.filter(number => !currentWord.includes(number)).length
    const isGameWon = currentWord.split("").every(letter => currentGuesses.includes(letter))
    const isGameLost = wrongGuessesCount >= languages.length - 1
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = currentGuesses[currentGuesses.length - 1]
    const isMostRecentGuessWrong = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuess(letter) {
        // Only add the guess if it isn't already in the array
        setCurrentGuesses(currentGuesses => 
            currentGuesses.includes(letter) ?
                currentGuesses :
                [...currentGuesses, letter]
        )
    }
    
    // Map over languages and display each one as a span to display amount of lives/guesses
    const languageElements = languages.map((language, index) => {
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        // Conditionally add "lost" class name on the languages for incorrect guesses
        const isLost = index < wrongGuessesCount
        const classNames = clsx({
            language: true,
            lost: isLost 
        })
        return (
            <span
                key={language.name}
                style={styles} 
                className={classNames}
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
                {/* Only include the letter in the span when the letter is guessed so that it won't show while inspecting in the browser */}
                {currentGuesses.includes(letter) ? letter.toUpperCase() : ""}
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
        const classNames = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        return (
            <button
                key={letter}
                className={classNames}
                disabled={isGameOver}
                onClick={() => addGuess(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    const gameStatusClassNames = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isMostRecentGuessWrong
    })

    function renderGameStatus() {
        if(!isGameOver && isMostRecentGuessWrong) {
            return (
                <p 
                    className="farewell-message"
                >
                    {getFarewellText(languages[wrongGuessesCount - 1].name)}
                </p>
            )
        }
        if(isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }
        if(isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
        return null
    }

    function newGame() {
        setCurrentGuesses([])
        // Might also need to change the word here when we move on from the hard coded word
    }

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
            </header>
            {/* Using sections is likely more syntactically correct than using div */}
            <section className={gameStatusClassNames}>
                {renderGameStatus()}
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
            {isGameOver && <button className="new-game" onClick={newGame}>New Game</button>}
        </main>
    )
}
