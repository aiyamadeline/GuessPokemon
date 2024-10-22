// import React, { useState, useEffect } from 'react';

// const PokemonAutocomplete = ({ onSelectPokemon }) => {
//   const [allPokemonNames, setAllPokemonNames] = useState([]); // Store all Pokémon names
//   const [userGuess, setUserGuess] = useState(''); // User's current input in the search bar
//   const [suggestions, setSuggestions] = useState([]); // Suggestions to display
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all Pokémon names when the component mounts
//   useEffect(() => {
//     const fetchAllPokemonNames = async () => {
//       try {
//         const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898'); // Get 898 Pokémon
//         const data = await response.json();
//         const names = data.results.map(pokemon => pokemon.name);
//         setAllPokemonNames(names); // Save Pokémon names in state
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching Pokémon names');
//         setLoading(false);
//       }
//     };

//     fetchAllPokemonNames();
//   }, []);

//   // Update suggestions when user types
//   const handleInputChange = (e) => {
//     const input = e.target.value;
//     setUserGuess(input);

//     if (input.length > 0) {
//       const filteredSuggestions = allPokemonNames.filter(pokemon =>
//         pokemon.toLowerCase().startsWith(input.toLowerCase())
//       );
//       setSuggestions(filteredSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Handle suggestion click
//   const handleSuggestionClick = (suggestion) => {
//     setUserGuess(suggestion); // Set the input to the clicked suggestion
//     setSuggestions([]); // Hide suggestions after a selection
//     onSelectPokemon(suggestion); // Pass the selected Pokémon name to the parent
//   };

//   if (loading) {
//     return <div>Loading Pokémon names...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <input
//         type="text"
//         className="form-control"
//         placeholder="Enter Pokémon name"
//         value={userGuess}
//         onChange={handleInputChange}
//       />
//       {/* Render Suggestions */}
//       {suggestions.length > 0 && (
//         <ul className="list-group mt-1">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               className="list-group-item list-group-item-action"
//               onClick={() => handleSuggestionClick(suggestion)}
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default PokemonAutocomplete;
