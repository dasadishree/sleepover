import {useState} from "react"
import {startRound, rerollEmoji, getSrc, guessEmoji, checkGuess, emojiChoices} from "./gameLogic.js"

export default function TestGame(){
    const [currentEmoji, setCurrentEmoji] = useState(null)
    const [result, setResult] = useState(null)

    async function handleStart(){
        const id = await startRound()
        setCurrentEmoji(id)
        setResult(null)
        console.log("Round started with emoji:", id)
    }

    async function handleReroll() {
        const id = await rerollEmoji(currentEmoji)
        setCurrentEmoji(id)
        setResult(null)
        console.log("Rerolled! New emoji:", id)
    }

    async function handleGuess(emojiId) {
        await guessEmoji(emojiId)
        const isCorrect = await checkGuess()
        setResult(isCorrect ? "Correct!" : "Wrong, try again!")
        console.log("Guessed:", emojiId, "Correct?", isCorrect)
    }

    return (
        <div>
            <button onClick={handleStart}>Start Round</button>
            <button onClick={handleReroll} disabled={!currentEmoji}>Reroll</button>

            {currentEmoji &&(
                <div>  
                    <p>Current emoji: {currentEmoji}</p>
                    <img src={getSrc(currentEmoji)} alt={currentEmoji} width={100}/>
                </div>
            )}

            {result && <p>{result}</p>}

            <div>
                <h3>Guess an emoji:</h3>
               <div>
                    {emojiChoices.map(emoji=> (
                        <button key={emoji.id} onClick={()=>handleGuess(emoji.id)} style={{background:"none", border:"2px solid #ccc", borderRadius: "8px", padding: "4px", cursor: "pointer"}}>
                            <img src={emoji.src} alt={emoji.id} width={60}/>
                        </button>
                    ))}
               </div>
            </div>
        </div>
    )

}
