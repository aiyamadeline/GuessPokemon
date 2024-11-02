import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style/createCard.css';
import 'animate.css';


const PokemonCard = ({ guessedPokemon, feedback, isCorrect }) => {
    if (!guessedPokemon) return null;
    
    const primaryType = guessedPokemon.types[0].type.name;
    const typeClass = `type-${primaryType}`;
    

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
            case 'Wrong Generation':
                return <i className="bi bi-x"></i>;
            default:
                    return null;
        }
    };

    const typeColours = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    const cardStyle = {
        backgroundColor: typeColours[guessedPokemon.types[0].type.name] || '#FFF',
    }

    return (

        <Container>
            <Row className="gx-4 gy-4 mt-5 justify-content-start">
                <Col md={3} className={`custom-card ${isCorrect ? 'flip' : ''}`}>
                    <div className='flip-card-inner'>
                        <div className='flip-card-front'>
                            <Card style={{ width: '100%', ...cardStyle }} className={`card-1 ${typeClass}`}>
                                <Card.Img
                                    variant="top"
                                    src={guessedPokemon.sprites.front_default}
                                    alt={guessedPokemon.name}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                                <Card.Body>
                                    <Card.Title className='text-capitalize'>{guessedPokemon.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Height:</strong> {guessedPokemon.height} {getIcon(feedback.height)} <br />
                                        <strong>Weight:</strong> {guessedPokemon.weight} {getIcon(feedback.weight)} <br />
                                        <strong>Type 1:</strong> {guessedPokemon.types[0].type.name} {getIcon(feedback.type1)} <br />
                                        <strong>Type 2:</strong> {guessedPokemon.types[1]?.type.name || "None"} {getIcon(feedback.type2)} <br />
                                        <strong>Gen:</strong> {guessedPokemon.generation} {getIcon(feedback.generation)} <br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="flip-card-back" style={{ ...cardStyle }}>
                            <Card style={{ width: '100%' }} className={`card-1 ${typeClass}`}>
                                <Card.Body>
                                    <Card.Title className='text-capitalize'>{guessedPokemon.name}</Card.Title>
                                    <Card.Text>
                                        <strong className='correct-guess'>Correct Pokemon!</strong>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PokemonCard;

