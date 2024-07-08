
import './Button.css';

export interface ButtonProps {
    buttonText: string;
    onClick?: () => void;
    primaryButton?: boolean;
}

const Button: React.FC<ButtonProps> = ({ buttonText, onClick, primaryButton=true }: ButtonProps) => {

    return (
        <button data-testid="button" onClick={onClick} className={primaryButton ? "primary-button" : "secondary-button"}>
            {buttonText}
        </button>
    );
}

export default Button;
