import { useCallback, useEffect, useState } from "react";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// styles
import "./App.css";

// data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  //useState para conseguir alterar os valores de estágios da aplicação
  const [gameStage, setGameStage] = useState(stages[0].name)
  //Variavel que recebe o objeto "words"
  const [words] = useState(wordsList)
  
  return (
    <div className="App">
  
      {gameStage === 'start' && <StartScreen/>}
      {gameStage === 'game' && <Game/>}
      {gameStage === 'end' && <GameOver/>}
    </div>
  );
}

export default App;
