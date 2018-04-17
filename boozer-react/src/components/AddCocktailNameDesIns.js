import React from 'react'

export default class CreateCocktail extends React.Component {




  render() {
    return (
      <div>
          <label htmlFor='name'>Name: </label>
          <input onChange={this.props.handleChange} type="text" name='name'/>
          <br/>
          <label htmlFor='description'>Description: </label>
          <textarea onChange={this.props.handleChange} name='description'/>
          <br/>
          <label htmlFor='instructions'>Instructions: </label>
          <textarea onChange={this.props.handleChange} name='instructions'/>

      </div>
    )
  }
}
