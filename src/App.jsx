import React from 'react';
import {Die} from "./Die"
import { useState } from 'react';
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())

 let gameWon = checkWin();
 function checkWin(){
    const check = dice.map(die => die.isHeld ?
     die.value : false 
    )
    console.log(check)
    for(let i = 0 ; i< check.length ; i ++ )
    {
        if(check[i] !== check[0] || check[i] === false)
        {
            return false;
        }
    }
    console.log("ganhou");
    return true;
      }   


function generateAllNewDice() {
    return new Array(10)
        .fill(0)
        .map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }))
}

function generateNumber(){
   const number = Math.floor(Math.random() * 6) + 1;
   return number;
}

function rollDice() {
    //setDice(generateAllNewDice());
    setDice(oldDice => oldDice.map(die => die.isHeld? 
         die : {...die, value: generateNumber()} 
    )

    )
}

function hold(id) {
    setDice(oldDice => {
        return oldDice.map(die => {
            return die.id === id ?
                {...die, isHeld: !die.isHeld} :
                die
        })
    })
}

function resetGame()
{
    gameWon = false;
    setDice(generateAllNewDice());

}


const diceElements = dice.map(dieObj => (
    <Die
        key={dieObj.id}
        value={dieObj.value}
        isHeld={dieObj.isHeld}
        hold={hold}
        id={dieObj.id}
    />
))

  return (
    <main>        
        <h1>Tenzies</h1>
        <h2>Click the dice to lock (green) click again to unlock. You can roll all unlocked dices by clicking "Roll".
             To win, you have to get all dice green and same color.
        </h2>
        <div className = "DieHolder">   
     {diceElements}
      </div>
      {gameWon?     <button className = "rollDice" onClick ={resetGame}> Play Again </button> :
                     <button className = "rollDice" onClick ={rollDice}> ROLL </button> 
      }
    {gameWon?     <Confetti/>: ""}
    </main>
  );
}
