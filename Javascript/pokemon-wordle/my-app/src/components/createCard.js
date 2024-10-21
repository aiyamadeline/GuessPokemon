import Card from 'react-bootstrap/Card';

const PokemonCard = ({ guessedPokemon, feedback }) => {
    if (!guessedPokemon) return null;

    return (
        <Card className='mt-4' style={{width: '18rem'}}>
            <Card.Img variant='top' src={guessedPokemon.sprites.front_default} alt={guessedPokemon.name} />
            <Card.Body>
                <Card.Title className='text-capitalize'>{guessedPokemon.name}</Card.Title>
                <Card.Text>
                    <strong>Height:</strong> {guessedPokemon.height} decimetres<br />
                    <strong>Weight:</strong> {guessedPokemon.weight} hectograms<br />
                    <strong>Type 1:</strong> {guessedPokemon.types[0].type.name}<br />
                    <strong>Type 2:</strong> {guessedPokemon.types[1]?.type.name || "None"}<br />
                </Card.Text>
                <Card.Text>
                    <h6>Guess Feedback:</h6>
                    <strong>Height:</strong> {feedback.height}<br />
                    <strong>Weight:</strong> {feedback.weight}<br />
                    <strong>Type 1:</strong> {feedback.type1}<br />
                    <strong>Type 2:</strong> {feedback.type2}<br />
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default PokemonCard;

