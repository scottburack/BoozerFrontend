import React from 'react'
import Cocktail from './Cocktail.js'
import CocktailDescription from './CocktailDescription.js'
import CreateCocktail from './CreateCocktail.js'
import CocktailProportions from './CocktailProportions'
import CocktailFilter from './CocktailFilter'

const URL = "http://localhost:3000/api/v1/cocktails/"

export default class CocktailsContainer extends React.Component {

  constructor() {
    super()

    this.state = {
      cocktails: [],
      clicked: false,
      chosenDrinkId: null,
      chosenProportions: [],
      searchValue: ''
    }
  }


  componentDidMount() {
    fetch(URL).then(resp => resp.json()).then(json => this.setState({cocktails: json}))
  }

  handleCtClick = (event) => {
    let clickedId = event.target.id
    this.setState({
      clicked: true,
      chosenDrinkId: clickedId
    })

    fetch(URL + clickedId).then(resp => resp.json())
    .then(json => this.setState({chosenProportions: json.proportions}))
  }

  addNewDrinkToList = (drink) => {
    this.setState({
      cocktails: [...this.state.cocktails, drink]
    })
  }

  handleSearch = (event) => {
    event.preventDefault()
    this.setState({
      searchValue: event.target.value,
    })
  }

  renderCocktailList = () => {
    const filteredCocktails = this.state.cocktails.filter(cocktail => {
      return cocktail.name.toUpperCase().includes(this.state.searchValue.toUpperCase()) //  || cocktail.description.toUpperCase().includes(this.state.searchValue.toUpperCase())
    })
     return filteredCocktails.map(ct => <a hfef="#" id={ct.id} onClick={this.handleCtClick}>{ct.name}</a>)
  }

  clearDescription = () => {
    this.setState({
      clicked: false
    })
  }



  render() {
    return (
      <div id='main-div'>
        <h1 id='title'><marquee scrollAmount='100'>BOOZER!</marquee></h1>
        <div className='sidenav'>
          <marquee><Cocktail renderCocktailList={this.renderCocktailList}/></marquee>
        </div>

        <div id='search-bar'>
          <marquee direction='right' scrollAmount='25'><CocktailFilter handleSearch={this.handleSearch} searchValue={this.state.searchValue}/></marquee>
        </div>
        <div id='drink-container'>
          <div id='add-cocktail'>
            <marquee direction='right'><CreateCocktail handleSubmit={this.handleSubmit} addNewDrinkToList={this.addNewDrinkToList} cocktails={this.state.cocktails}/></marquee>
          </div>

          <div id='cocktail-description' onClick={this.clearDescription}>
            {this.state.clicked ?
              <CocktailDescription cocktails={this.state.cocktails} chosenDrinkId={this.state.chosenDrinkId} chosenProportions={this.state.chosenProportions}/>
              : null}
          </div>
        </div>
      </div>


    )
  }
}
