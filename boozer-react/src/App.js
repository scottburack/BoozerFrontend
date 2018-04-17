import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CocktailsContainer from './components/CocktailsContainer'

class App extends Component {
  render() {
    return (

      <div className="App">
        <MuiThemeProvider>
          <CocktailsContainer />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
