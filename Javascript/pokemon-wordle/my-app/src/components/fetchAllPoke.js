import { useState, useEffect } from 'react';

// Custom hook to fetch all Pokémon data
export const useFetchAllPokemonNames = () => {
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898'); // Fetch all 898 Pokémon
        const data = await response.json();
        const names = data.results.map(pokemon => pokemon.name);
        setAllPokemonNames(names); // Save Pokémon names
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch Pokémon names');
        setLoading(false);
      }
    };

    fetchAllPokemonNames();
  }, []);

  return { allPokemonNames, loading, error };
};
