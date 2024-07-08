import { useContext } from 'react';
import './MancalaGame.css';
import { MancalaContext } from '../../context/MancalaContext';
import Button from '../Button/Button';
import { GameStatus, Player } from '../../models/enum';

const MancalaGame: React.FC = () => {

  const { pitsA,
    pitsB,
    currentPlayer,
    gameStatus,
    sessionPlayer,
    sendStartGameMessage,
    sendInProgressGameMessage } = useContext(MancalaContext);

  const pitClicked = (pintInd: number) => {
    sendInProgressGameMessage(pintInd)
  }

  const playInTheSameScreen = () => {
    sendStartGameMessage(Player.A, false)
  }

  const playWithAFrnd = () => {
    sendStartGameMessage(Player.A, true)
  }

  const joinExistingGame = () => {
    sessionPlayer && sendStartGameMessage(sessionPlayer, true)
  }

  const isCurrentTurn = (player: Player, stones: number): boolean => {
    if (stones <= 0) return false
    if (sessionPlayer == null) return currentPlayer == player;
    else return (sessionPlayer == player && currentPlayer == player);
  }

  return (
    <section className="Mancala-Container">     

      <div className="boardContainer">
        <p>Player A's side</p>

        <div className="board">

          <div className="mancala-player-1">
            <p className="stones-text">{pitsA[6]}</p>
            <div className="stones-container ">{Array(pitsA[6]).fill(1).map((stone, index) => <i key={index} className="icon fas fa-cookie"></i>)}</div>
          </div>

          <div className="game-pits">

            <div className="pits-player-1">
              {pitsA.flatMap((stones, pitInd) => {
                if (pitInd == 6) return [];
                else return (<div role="button" key={`pitsA-pit-${pitInd}`} id={`pitsA-pit-${pitInd}`}
                  onClick={() => isCurrentTurn(Player.A, stones) && pitClicked(pitInd)}
                  className={`pit ${!isCurrentTurn(Player.A, stones) && "disabled"}`}>
                  <p className="stones-text">{stones}</p>
                  <div className={`stones-container ${stones > 19 && "big-conatiner"}`}>{Array(stones).fill(0).map((stone, index) => <i key={index} className="icon fas fa-cookie"></i>)}</div>
                </div>)
              })}
            </div>

            <div className="pits-player-2">
              {pitsB.flatMap((stones, pitInd) => {
                if (pitInd == 6) return [];
                else return (<div role="button" key={`pitsB-pit-${pitInd}`} id={`pitsB-pit-${pitInd}`}
                  onClick={() => isCurrentTurn(Player.B, stones) && pitClicked(pitInd)}
                  className={`pit ${!isCurrentTurn(Player.B, stones) && "disabled"}`}>
                  <p className="stones-text">{stones}</p>
                  <div className={`stones-container ${stones > 19 && "big-conatiner"}`}>{Array(stones).fill(0).map((stone, index) => <i key={index} className="icon fas fa-cookie"></i>)}</div>
                </div>)
              })}
            </div>

          </div>

          <div className="mancala-player-2">
            <p className="stones-text">{pitsB[6]}</p>
            <div className="stones-container">{Array(pitsB[6]).fill(1).map((stone, index) => <i key={index} className="icon fas fa-cookie"></i>)}</div>
          </div>
        </div>

        <p>Player B's side</p>
      </div>

      <div className="buttons-container">


      {
        gameStatus == null && sessionPlayer == null &&     
        <> 
          <Button buttonText={'Play in the same screen'} onClick={playInTheSameScreen}></Button>
          <Button buttonText={'Play with a remote Friend'} onClick={playWithAFrnd}></Button> 
          </>         
      }

      {
        gameStatus == null && sessionPlayer == Player.B &&
          <Button buttonText={'Join the game'} onClick={joinExistingGame}></Button>
      }
       {
        gameStatus != null && (gameStatus == GameStatus.End || gameStatus == GameStatus.InProgress) &&
          <Button primaryButton={false} buttonText={'Reset and Play another game'} onClick={() => window.location.href = "/"}></Button>
      }
      </div>
    </section>
  );
}

export default MancalaGame;
