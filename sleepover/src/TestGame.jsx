import {useState} from "react"
import {startRound, rerollEmoji, getSrc} from "./gameLogic.js"

export default function TestGame(){
    const [currentEmoji, setCurrentEmoji] = useState(null)
    async function handleStart(){
        const id = await startRound()
        setCurrentEmoji(id)
        console.log("Round started with emoji:", id)
    }

    async function handleReroll() {
        const id = await rerollEmoji(currentEmoji)
        setCurrentEmoji(id)
        console.log("Rerolled! New emoji:", id)
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
        </div>
    )

}