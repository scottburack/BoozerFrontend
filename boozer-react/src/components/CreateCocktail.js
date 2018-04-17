import React from 'react'
import CocktailProportions from './CocktailProportions'
import AddCocktailNameDesIns from './AddCocktailNameDesIns'
const URL = "http://localhost:3000/api/v1/cocktails/"

export default class CreateCocktail extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      form: {
        name: '',
        description: '',
        instructions: '',
        proportions: [
          {
            ingredient_name: '',
            amount: ''
          }
        ]
      },
      // proportionsNum: 1
    }
  }

  //
  // handleProportions = (event) => {
  //   this.setState({
  //     proportions: {
  //       ...this.state.proportions,
  //       {[event.target.name]: event.target.value}
  //     }
  //   },() => console.log(this.state.proportions))
  // }


  clickedPropotionBtn = (event) => {
    event.preventDefault()
    this.setState({
      proportions: this.state.form.proportions.push({ingredient_name: '', amount: ''})
    })
  }
  //
  // renderProportionList = () => {
  //   let allProps = []
  //   for (let i = 0; i < this.state.proportionsNum; i++) {
  //     allProps.push(<CocktailProportions handleProportions={this.handleProportions}/>)
  //   }
  //   return allProps
  // }

  handleProportionInputChange = (idx) => (evt) => {
    const newProportions = this.state.form.proportions.map((proportion, proportionIdx) => {
      if (idx !== proportionIdx) return proportion;
      return { ...proportion, [evt.target.name]: evt.target.value };
    });

    this.setState({form: {...this.state.form, proportions: newProportions }}, () => console.log(this.state.form));
  }


  handleDeleteProportion = (idx) => {
    const newProportions = this.state.form.proportions.filter((proportion, proportionIdx) => {
      return (idx !== proportionIdx)
    })

    this.setState({form: {...this.state.form, proportions: newProportions }})
  }

  handleChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
  }


  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.form)
    fetch('http://localhost:3000/api/v1/cocktails', {
      method: "POST",
      body: JSON.stringify(this.state.form),
      headers: ({
        'Content-Type': 'application/json'
      })
    }
  ).then(resp => resp.json())
  .then(json => this.props.addNewDrinkToList(json[json.length-1]))

    event.target.reset()

  // .then(() => fetch(URL + `${this.props.cocktails[this.props.cocktails.length-1].id}`, {
  //   method: "PATCH",
  //   body: JSON.stringify(this.state.proportions[0]),
  //   headers: ({
  //     'Content-Type': 'application/json'
  //   })
  // }))

  }



  render() {
    return (
      <div>
        <h2>Add Your Own Cocktail!</h2>
        <h3>Or find one on the side to view!</h3>
        <form onSubmit={this.handleSubmit}>
          <AddCocktailNameDesIns handleChange={this.handleChange}/>
          <p>Proportions:</p>
          <div>
            {this.state.form.proportions.map((proportion, idx) => (
          <div className="proportion">
            <input
              name="ingredient_name"
              type="text"
              placeholder={`proportion #${idx + 1} name`}
              value={this.state.form.proportions.ingredient_name}
              onChange={this.handleProportionInputChange(idx)}
            />
            <input
              name="amount"
              type="text"
              placeholder={`proportion #${idx + 1} amount`}
              value={this.state.form.proportions.amount}
              onChange={this.handleProportionInputChange(idx)}
            />
            <button onClick={() => this.handleDeleteProportion(idx)}>X</button>
          </div>
            ))}
          </div>
          <button onClick={this.clickedPropotionBtn}>Add Proportion</button>
          <input type='submit' />
        </form>
      </div>
    )
  }
}
