import { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import GetPokemons from "./getPoke";

// function SearchBar() {

//   const[searchInput, setSearchInput] = useState('');
//   const[filteredPoke, setFilteredPoke] = useState([]);

//   const handleSearch = (e) => {
//       const searchInput = e.target.value;
//       setSearchInput(searchInput)
//   }

//   return (
//       <>
//       <input
//       type="text"
//       value={searchInput}
//       onChange={handleSearch}
//       placeholder='Type to search'
//     />
//     <div className="input-group-append">
//       <button className="btn btn-outline-secondary" onClick={handleSearch}>
//           Search
//       </button>
//     </div>
//     <ul>
//       {filteredPoke.map(poke => <li>{poke.height}{poke.weight}{poke.types[0].type.name}{poke.types[1].type.name}{poke.past_abilities[0].generation.name}</li>)}
//     </ul>
//       </>
      
//   )
// }

// export default SearchBar;
