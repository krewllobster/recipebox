import React, { Component } from 'react';
import classNames from 'classnames';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recipes: [
        {
          name: 'Spaghetti',
          description: 'lorem ipsum dolor sit amet',
          open: false,
          parts: [
            'noodles',
            'sauce',
            'meatballs'
          ]
        },
        {
          name: 'Spaghettis',
          description: 'lorem ipsum dolor sit amet',
          open: false,
          parts: [
            'noodles',
            'sauce',
            'meatballs'
          ]
        },
      ],
    }
  }

  render() {

    const {recipes} = this.state;

    return (
      <div className = 'flex-container'>
        <RecipeBox recipes = {recipes}/>
      </div>
    );
  }
}

const Recipe = ({item}) => {

  const toggle =

  return (
    <div className = 'card recipe'>
      <div className = 'card-header'>
        <a className="recipeName">{item.name}</a>
      </div>
      <div className='toggle-on'>
        <div className = 'card-block'>
          <p className = 'card-text description'>{item.description}</p>
        </div>
        <ul className = "list-group list-group-flush">
          {item.parts.map(part => (
            <li className = 'list-group-item'>{part}</li>
          ))}
        </ul>
        <div className = 'card-footer'>
          <div className = 'row'>
            <div className = 'col-sm-3 col-6'>
              <Button
                type = 'button'
                value = 'delete'
                onClick = {() => {}}
                cName = 'btn btn-danger'
              >
                Delete
              </Button>
            </div>
            <div className = 'col-sm-3 col-6'>
              <Button
                type = 'button'
                value = 'edit'
                onClick = {() => {}}
                cName = 'btn btn-secondary'
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const RecipeBox = ({recipes}) =>
  <div className = 'card main'>
    <div className = 'card-header'>
      <h4 className = 'card-title'>RecipeBox</h4>
    </div>
    <div className = 'card-block'>
      {recipes.map(item => <Recipe item = {item} />)}
    </div>
    <div className = 'card-footer'>
      <Button
        value = 'addrecipe'
        onClick = {() => {}}
        cName = 'btn btn-info'
      >
        Add Recipe
      </Button>
    </div>
  </div>


const Button = ({type, selected, onClick, value, children, cName}) => {

  const buttonClass = classNames(
    cName,
    {'button-active': selected === value}
  )
  return (
    <button
      className = {buttonClass}
      onClick = {onClick}
      value = {value}
    >{children}</button>
  )
}

export default App;
