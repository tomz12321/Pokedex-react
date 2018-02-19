import React, { Component } from 'react';
import Header from './Header';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      text: "",
      name: "",
    };

    this.pokemonNameOnChange = this.pokemonNameOnChange.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);
  }

  pokemonNameOnChange(event) {
    //console.log(event.target)
    this.setState({text: event.target.value});
  }
  
  searchPokemon(event){
    //console.log(event);
    event.preventDefault();
    //console.log(this.state.text);
    const id = this.state.text;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw TypeError(res.status);
        }
        return res.json();
      })
      .then((body) => {
        this.setState({
          name: body.name,
          err: "",
        });
      })
      .catch((err) => {
        this.setState({
          err: err.message,
          name: "",
        });
    });
  }


  render() {
    return (
      <div className="App">
        <Header />
        <form onSubmit={this.searchPokemon}>
          Enter Pokemon Name or National Pokedex number:
          <input type="text" name="pokemonName" onChange={this.pokemonNameOnChange} required/>
          <input type="submit" id="submit" value="Search"/>
        </form>
          <p>Name: {this.state.name}</p>
          <p>{this.state.err}</p>
      
      </div>
    );
  }
}

export default App;
