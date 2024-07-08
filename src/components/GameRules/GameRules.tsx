
import './GameRules.css';

const GameRules: React.FC = () => {

    return (
        <section className="game-rules-container">
            <h3 data-testid="rule-header">Game Rules</h3>
            <ol>
                <li data-testid="rule">The game begins with one player picking up all of the pieces in any one of the pockets on his/her side.</li>
                <li data-testid="rule"> Moving counter-clockwise, the player deposits one of the stones in each pocket until the stones run out</li>
                <li data-testid="rule"> If you run into your own Mancala (store), deposit one piece in it. If you run into your opponent's Mancala, skip it and continue moving to the next pocket.</li>
                <li data-testid="rule"> If the last piece you drop is in your own Mancala, you take another turn.</li>
                <li data-testid="rule"> If the last piece you drop is in an empty pocket on your side, you capture that piece and any pieces in the pocket directly opposite.</li>
                <li data-testid="rule">Always place all captured pieces in your Mancala (store).</li>
                <li data-testid="rule">The game ends when all six pockets on one side of the Mancala board are empty.</li>
                <li data-testid="rule"> Count all the pieces in each side. The winner is the player with the most pieces.</li>
            </ol>
        </section>
    );
}

export default GameRules;
