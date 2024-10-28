import './App.css';
import Homepage from './components/Suggestions';
import GetPokemons from './components/getPoke';
import SearchBar from './components/navBar';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

  
  return (
    <> 
    <div className="App">
      <header className='header-1'>
        <h1 className='title'>Pokemon Wordle</h1>
      </header>
      <GetPokemons />
    </div>
    </>
  );
}

export default App;
