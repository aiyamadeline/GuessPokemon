import { useState, useEffect } from 'react';
import PokemonCard from './createCard';
import Suggestions from './Suggestions';
import { useFetchAllPokemonNames } from './fetchAllPoke';
import '../style/getPoke.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const getGeneration = (id) => {
    if (id <= 151) return 1;
    if (id <= 251) return 2;
    if (id <= 386) return 3;
    if (id <= 493) return 4;
    if (id <= 649) return 5;
    if (id <= 721) return 6;
    if (id <= 809) return 7;
    return 8;
};

const fetchPoke = async (randomId) => {
    const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    if (!reponse.ok) {
        throw new Error("Pokemon not found")
    }
    const data = await reponse.json();

    return  {
        ...data, 
        generation: getGeneration(randomId)
    };
};


const PokemonWordle = () => {

    const [ChosenPokemon, SetChosenPokemon] = useState('');
    const [userGuess, setUserGuess] = useState("");
    const [guessedPokemon, setGuessedPokemon] = useState([]); 
    const [feedback, setFeedback] = useState("");
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [suggestions, SetSuggestions] = useState([])
    const [isCorrect, setIsCorrect] = useState(false);
    
    const { allPokemonNames, loading, error } = useFetchAllPokemonNames();

    useEffect(() => {
        const getPokemon = async () => {
            try{
                const randomId = Math.floor(Math.random() * 898) + 1;
                const randomPokemon = await fetchPoke(randomId);
                SetChosenPokemon({
                    ...randomPokemon,
                    generation: getGeneration(randomId)
                });
            
            } catch(error) {
                console.log("failed to fetch random pokemon", error)
            }
        };
        getPokemon(); 
    }, []);

    const handleInputChange = (e) => {
        setUserGuess(e.target.value);

        if (e.target.value.length > 0 && allPokemonNames.length > 0) {
            
            const filteredSuggestions = allPokemonNames.filter(pokemon =>
              pokemon.toLowerCase().startsWith(e.target.value.toLowerCase())
            );
            SetSuggestions(filteredSuggestions);
        } else {
            SetSuggestions([]);
        }
    };
    const handleSuggestionClick = (suggestion) => {
        setUserGuess(suggestion);
        SetSuggestions([]);
    };
    
    if (loading) {
        return <div>Loading Pokémon names...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }


    const handleGuessSubmit = async (e) => {
        e.preventDefault();
        if(!ChosenPokemon) return;
        
        try {
            const guessedPokemonData = await fetchPoke(userGuess.toLowerCase());
            guessedPokemonData.generation = getGeneration(guessedPokemonData.id);
            
            setGuessedPokemon(guessedPokemonData);

            if (guessedPokemonData.name === ChosenPokemon.name) {
                setIsCorrect(true);
                setFeedback("Correct!")
                
            } else {
                setIsCorrect(false);
            
            }
        
            const comparisonFeedback = {
                name: guessedPokemonData.name,
                height: guessedPokemonData.height === ChosenPokemon.height
                ? "Correct"
                : guessedPokemonData.height < ChosenPokemon.height
                ? "Too Short"
                : "Too Tall",
                weight: guessedPokemonData.weight === ChosenPokemon.weight
                ? "Correct"
                : guessedPokemonData.weight < ChosenPokemon.weight
                ? "Too Light"
                : "Too Heavy",
                type1: guessedPokemonData.types[0].type.name === ChosenPokemon.types[0].type.name
                ? "Correct"
                : "Wrong Type",
                type2: (guessedPokemonData.types[1]?.type.name || "None") === (ChosenPokemon.types[1]?.type.name || "None")
                ? "Correct"
                : "Wrong Type",
                generation: guessedPokemonData.generation === ChosenPokemon.generation
                ? "Correct"
                : "Wrong Generation",
            };

        setFeedback(comparisonFeedback);
        setPreviousGuesses((prev) => [
            { guessedPokemon: guessedPokemonData, feedback: comparisonFeedback },
             ...prev,
        ]);
    
    
    } catch (error) {
        setFeedback({ name: "", error: "Invalid Pokémon name, please try again." });
        console.log("Failed to fetch guessed Pokemon", error)
    }
};

return (
    <>
    <form onSubmit={handleGuessSubmit} className='move-down'>
        <div className='form-group'>
            <input
            type='text'
            className='form-control pokedex-search'
            placeholder='Enter Pokemon name'
            value={userGuess}
            onChange={handleInputChange}
            />
            <Suggestions
            suggestions={suggestions}
            handleSelectSuggestion={handleSuggestionClick}
            />
        </div>
        <button type='submit' className="btn pokedex-button mt-2">
            <span className='pokedex-led'></span>
            Guess
        </button>
    </form>


    {previousGuesses.length > 0 && (
    <div className="container mt-3">
        <h4>Previous Guesses:</h4>
        <Container>
            <Row className="gx-3 gy-5 mt-3"> 
                {previousGuesses.map((guess, index) => (
                    <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3}>
                        <PokemonCard 
                            guessedPokemon={guess.guessedPokemon}
                            feedback={guess.feedback}
                            isCorrect={isCorrect && guess.guessedPokemon.name === ChosenPokemon.name}
                        />
                    </Col>
                ))}
            </Row>
        </Container> 
        <h5>{ChosenPokemon.name}</h5>
    </div>
    )}



    </>
    );
};


export default PokemonWordle;
