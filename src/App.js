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

const guessesQty = 3

function App() {
  //useState para conseguir alterar os valores de estágios da aplicação
  const [gameStage, setGameStage] = useState(stages[0].name)
  //Variavel que recebe o objeto "words" ou seja, a palavras que serão utilizadas
  const [words] = useState(wordsList)

  //States
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  //letras adivinhadas
  const [guessedLetters, setGuessedLetters] = useState([])
  //letras erradas
  const [wrongLetters, setWrongLetters] = useState([])
  //tentativas
  const [guesses, setGuesses] = useState(guessesQty)
  //pontuação
  const [score, setScore] = useState(0)


  const pickWordAndCategory = () => {
    //pegando a key do meu objeto de palavras, o ID.
    const categories = Object.keys(words)
    //pick random category
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pick a random word

    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word);
    return { word, category }
  }



  //start do jogo, vai pra tela de start
  const startGame = () => {
    //pick word and pick category
    const { word, category } = pickWordAndCategory()

    //create ab array of letters

    let wordLetters = word.split("")
    wordLetters = wordLetters.map(l => l.toLowerCase())
    console.log(wordLetters);
    console.log(word, category);

    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  //process the letter input
  const verifyLetter = (letter) => {
    //deixando a letra que vem do input em minuscula
    const normalizedLetter = letter.toLowerCase()

    //verificação se a letra ja foi utilizada de alguma forma
    if(guessedLetters.includes(normalizedLetter) || 
    wrongLetters.includes(normalizedLetter)){
      return
    }

    //incluir as letras acertadas, ou remover as letra erradas
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizedLetter
      ])
    }else{
      setWrongLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses)=>actualGuesses -1)
    }

  }

  const cleaLetterStates = () =>{
    setGuessedLetters([])
    setWrongLetters([])
  }

  //state para monitora a quantidade de tentativas
  useEffect(()=>{
    if(guesses <= 0){
      cleaLetterStates()
      setGameStage(stages[2].name)
    }
  },[guesses])

  //restarts the game
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }


  return (
    <div className="App">

      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game 
      verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
