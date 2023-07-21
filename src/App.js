import { useCallback, useEffect, useState } from "react";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// styles
import "./App.css";

// data
import { wordsList } from "./data/words";

//objeto dos estagios components
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  //useState para conseguir alterar os valores de estágios da aplicação
  const [gameStage, setGameStage] = useState(stages[0].name)
  //Variavel que recebe o objeto "words" ou seja, a palavras que serão utilizadas
  const [words] = useState(wordsList)

  //start do jogo, vai pra tela de start
  const startGame = () => {
    setGameStage(stages[1].name)
  }

  //process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  //restarts the game
  const retry = () => {
    setGameStage(stages[0].name)
  }


  return (
    <div className="App">

      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry ={retry} />}
    </div>
  );
}

export default App;
