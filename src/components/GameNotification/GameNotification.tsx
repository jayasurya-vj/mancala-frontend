
import { useContext } from 'react';
import { MancalaContext } from '../../context/MancalaContext';
import './GameNotification.css';



const GameNotification: React.FC = () => {

    const { notification } = useContext(MancalaContext);

    return (
        <h2 data-testid="notification" className="notification">
            {notification}
        </h2>
    );
}

export default GameNotification;
