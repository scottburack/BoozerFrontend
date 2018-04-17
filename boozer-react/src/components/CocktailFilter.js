import React from 'react'

export default class CocktailFilter extends React.Component {

  render() {
    return(
      <div>
        <label>Search For A Drink! </label>
        <input type='text' value={this.props.searchValue} onChange={this.props.handleSearch}/>
      </div>
    )
  }
}
