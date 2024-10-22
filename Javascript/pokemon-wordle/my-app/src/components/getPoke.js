import { useState, useEffect } from 'react';
import PokemonCard from './createCard';
import Suggestions from './Suggestions';
import { useFetchAllPokemonNames } from './fetchAllPoke';
//import PokemonAutocomplete from './PokemonAutoComp';

const fetchPoke = async (randomId) => {
    const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    if (!reponse.ok) {
        throw new Error("Pokemon not found")
    }
    const data = await reponse.json();
    return data;
}

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

const PokemonWordle = () => {

    const [ChosenPokemon, SetChosenPokemon] = useState('');
    const [userGuess, setUserGuess] = useState("");
    const [guessedPokemon, setGuessedPokemon] = useState([]); 
    const [feedback, setFeedback] = useState("");
    const [previousGuesses, setPreviousGuesses] = useState([]);
    //const [allPokemonNames, setAllPokemonNames] = useState([]);
    const [suggestions, SetSuggestions] = useState([])
    
    const { allPokemonNames, loading, error } = useFetchAllPokemonNames();
    //const  [selectedPoke, setSelectedPoke] = useState(null);

    useEffect(() => {
        const getPokemon = async () => {
            try{
            const randomId = Math.floor(Math.random() * 898) + 1;
            const randomPokemon = await fetchPoke(randomId);
            SetChosenPokemon(randomPokemon);
            

            }catch(error){
                console.log("failed to fetch random pokemon", error)
            }
        };
        getPokemon(); 
    }, []);

        const handleInputChange = (e) => {
        setUserGuess(e.target.value);

        if (e.target.value.length > 0 && allPokemonNames.length > 0) {
            // Filter Pokémon names based on the user's input
            const filteredSuggestions = allPokemonNames.filter(pokemon =>
              pokemon.toLowerCase().startsWith(e.target.value.toLowerCase())
            );
            SetSuggestions(filteredSuggestions);
          } else {
            SetSuggestions([]);
          }
        };
        const handleSuggestionClick = (suggestion) => {
            setUserGuess(suggestion); // Set the input to the clicked suggestion
            SetSuggestions([]); // Hide suggestions after a selection
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
    
    try{
        const guessedPokemonData = await fetchPoke(userGuess.toLowerCase());
        setGuessedPokemon(guessedPokemonData);

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
            generation: getGeneration(guessedPokemonData.id) === getGeneration(ChosenPokemon.id)
              ? "Correct"
              : "Wrong Generation"
          };

        setFeedback(comparisonFeedback);
        setPreviousGuesses((prev) => [...prev, {guessedPokemon: guessedPokemonData, feedback: comparisonFeedback}]);
        //setShowCard(true);
    
    }catch (error) {
        setFeedback({ name: "", error: "Invalid Pokémon name, please try again." });
        console.log("failed to fetch guessed Pokemon", error)
    }
};

return (
    <>
    <div className='container'>
        <form onSubmit={handleGuessSubmit}>
            <div className='form-group'>
                <input
                type='text'
                className='form-control'
                placeholder='Enter Pokemon name'
                value={userGuess}
                //onChange={(e) => setUserGuess(e.target.value)}
                onChange={handleInputChange}
                />
                <Suggestions
                suggestions={suggestions}
                handleSelectSuggestion={handleSuggestionClick}
                />
                
            </div>
            <button type='submit' className='btn btn-primary mt-2'>
                Guess
            </button>

        </form>
        {/* <PokemonAutocomplete onSelectPokemon={handlePokemonSelect} /> */}
        {previousGuesses.length > 0 && (
            <div className='mt-4'>
                <h4>Previous Guesses:</h4>
                {previousGuesses.map((guess, index) => (
                <PokemonCard 
                key={index}
                guessedPokemon={guess.guessedPokemon}
                feedback={guess.feedback}
                />
              ))}
            </div>
        )}
    </div>
    </>
);
};


export default PokemonWordle;
