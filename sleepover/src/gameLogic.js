import {db} from "./firebase.js"
import {doc, setDoc, getDoc} from "firebase/firestore"

// logic for the emojis / guesing
export const emojiChoices = [
    {id: "agadance", src: "/emojis/agadance.gif"},
    {id: "dino-pog", src: "/emojis/dino-pog.png"},
    {id: "eye_roll", src: "/emojis/eye_roll.png"},
    {id: "hii", src: "/emojis/hii.gif"},
    {id: "joe_sad", src: "/emojis/joe_sad.webp"},
    {id: "noooo", src: "/emojis/noooo.gif"},
    {id: "ooh", src: "/emojis/ooh.png"},
    {id: "pet-aga", src: "/emojis/pet-aga.gif"},
    {id: "prayer", src: "/emojis/prayer.webp"},
    {id: "sad-pf", src: "/emojis/sad-pf.png"},
    {id: "shrug3d", src: "/emojis/shrug3d.png"},
    {id: "smirk1", src: "/emojis/smirk1.gif"},
    {id: "thumbs-up", src: "/emojis/thumbs-up.png"},
    {id: "yay", src: "/emojis/yay.gif"},
    {id: "yesyesyes", src: "/emojis/yesyesyes.gif"},
    {id: "sad-cat-thumbs-up", src: "/emojis/sad-cat-thumbs-up.png"}
]

// randomly selects emoji (for the actor)
export async function startRound() {
    const random = emojiChoices[Math.floor(Math.random()* emojiChoices.length)]
    await setDoc(doc(db,"emojis", "correctEmoji"), {
        value: random.id
    })
    await setDoc(doc(db, "emojis", "guessedEmoji"), {
        value: ""
    })

    return random.id
}

//re select a diff emoji (for the actor)
export async function rerollEmoji(currentEmojiId){
    const others = emojiChoices.filter(e=>e.id!==currentEmojiId)
    const random = others[Math.floor(Math.random()* others.length)]

    await setDoc(doc(db, "emojis", "correctEmoji"), {
        value: random.id
    })
    await setDoc(doc(db, "emojis", "guessedEmoji"), {
        value: ""
    })
    return random.id
}

//get source file of the image
export function getSrc(emojiId){
    return emojiChoices.find(e=>e.id===emojiId)?.src
}

// guesser guesses an emoji (for the guesser)
export async function guessEmoji(emojiId){
    await setDoc(doc(db, "emojis", "guessedEmoji"), {
        value: emojiId
    })
}

//check guesser's answer (for both??)
export async function checkGuess(){
    const correct = await getDoc(doc(db, "emojis", "correctEmoji"))
    const guessed = await getDoc(doc(db, "emojis", "guessedEmoji"))
    return correct.data()?.value === guessed.data()?.value
}
