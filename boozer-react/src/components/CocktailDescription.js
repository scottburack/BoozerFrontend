import React from 'react'
import Cocktail from './Cocktail.js'

export default class CocktailDescription extends React.Component {

  showDescription = () => {
      const foundCocktail = this.props.cocktails.find(ct => ct.id === parseInt(this.props.chosenDrinkId))
      return (
        <div>
          <h2>{foundCocktail.name}</h2>
          <h4>{foundCocktail.description}</h4>
          <h4>{foundCocktail.instructions}</h4>
          <h3>Ingredients:</h3>
          {this.props.chosenProportions.map(proportion => <p>{proportion.ingredient_name} - {proportion.amount}</p>)}
        </div>
      )
  }


  render() {
    return (
      <div>
        {this.showDescription()}
      </div>

    )

  }
}
