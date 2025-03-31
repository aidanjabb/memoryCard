import './App.css'
import Game from "./components/Game/game.jsx"

function App() {
    /*
    The main goal of this project is to implement the concepts learned so far by using hooks to manage and utilize state while fetching and using data from an external API

    components: Game, Card
    */

  return (
    <>
        <h1>Game Title</h1>
        <h3>Game Description</h3>
        <Game/>
    </>
  )
}

export default App;
