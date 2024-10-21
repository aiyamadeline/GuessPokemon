import './App.css';
import Homepage from './components/homePage';
import GetPokemons from './components/getPoke';
import SearchBar from './components/navBar';

function App() {

  
  return (
    <> 
    <div className="App">
      <div>
      {/* <SearchBar/> */}
      <GetPokemons/>
      </div>
    </div>
    </>
  );
}

export default App;
