
import './App.css';
import GameRules from './components/GameRules/GameRules';
import MancalaGame from './components/MancalaGame/MancalaGame';
import GameNotification from './components/GameNotification/GameNotification';


const App: React.FC = () => {
  return (
    <>
      <header className="header">
        <h1 data-testid="app-header">Mancala Game</h1>
      </header>
      <main>
        <GameNotification></GameNotification>
        <MancalaGame></MancalaGame>
        <GameRules></GameRules>
      </main>
    </>
  );
}

export default App;
