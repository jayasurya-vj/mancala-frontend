
import './App.css';
import GameRules from './components/GameRules/GameRules';
import MancalaGame from './components/MancalaGame/MancalaGame';
import Notify from './components/GameNotification/GameNotification';


const App: React.FC = () => {
  return (
    <>
      <header className="header">
        <h1 data-testid="app-header">Mancala Game</h1>
      </header>
      <main>
        <Notify></Notify>
        <MancalaGame></MancalaGame>
        <GameRules></GameRules>
      </main>
    </>
  );
}

export default App;
