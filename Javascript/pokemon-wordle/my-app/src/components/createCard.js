import Card from 'react-bootstrap/Card';
import '../style/createCard.css';

const PokemonCard = ({ guessedPokemon, feedback }) => {
    if (!guessedPokemon) return null;


    const getIcon = (comparison) => {
        switch(comparison) {
            case 'Correct':
                return <i className="bi-check"></i>;
            case 'Too Short':
            case 'Too Light':
                return <i className="bi-arrow-down-short"></i>;
            case 'Too Tall':
            case 'Too Heavy':
                return <i className="bi-arrow-up-short"></i>; 
            case 'Wrong Type':
                return <i className="bi bi-x"></i>;
            default:
                    return null;
        }
    };

    return (
        //   <div className='row'>
            <div className='col-md-3 mt-4'>
                <Card style={{width: '13rem'}}>
                    <Card.Img
                    variant='top' 
                    src={guessedPokemon.sprites.front_default} 
                    alt={guessedPokemon.name} 
                    style={{width:'100%', height: 'auto'}} />
                    <Card.Body>
    <Card.Title className='text-capitalize'>{guessedPokemon.name}</Card.Title>
                <Card.Text>
                    <strong>Height:</strong> {guessedPokemon.height} {getIcon(feedback.height)} <br />
                    <strong>Weight:</strong> {guessedPokemon.weight} {getIcon(feedback.weight)} <br />
                    <strong>Type 1:</strong> {guessedPokemon.types[0].type.name} {getIcon(feedback.type1)} <br />
                    <strong>Type 2:</strong> {guessedPokemon.types[1]?.type.name || "None"} {getIcon(feedback.type2)} <br />
                </Card.Text>
                {/* <Card.Text>
                    <h6>Guess Feedback:</h6>
                    <strong>Height:</strong> {feedback.height}<br />
                    <strong>Weight:</strong> {feedback.weight}<br />
                    <strong>Type 1:</strong> {feedback.type1}<br />
                    <strong>Type 2:</strong> {feedback.type2}<br />
                </Card.Text> */}
            </Card.Body>
        </Card>
        </div>
    // </div>
        
    );
};

export default PokemonCard;

