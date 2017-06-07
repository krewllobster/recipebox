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

const Recipe = ({item}) =>
  <div className = 'card'>
    <div className = 'card-header'>
      <a className="btn btn-primary"
        data-toggle="collapse"
        href={`#${item.name}`}
        aria-expanded="false"
        aria-controls={`#${item.name}`}
      >{item.name}</a>
    </div>
    <div className = 'collapse' id={item.name}>
      <div className = 'card-block'>
        <p className = 'card-text'>{item.description}</p>
      </div>
      <ul className = "list-group list-group-flush">
        {item.parts.map(part => (
          <li className = 'list-group-item'>{part}</li>
        ))}
      </ul>
      <div className = 'card-footer'>
        <Button
          type = 'button'
          value = 'delete'
          onClick = {() => {}}
          cName = 'btn btn-danger'
        >
          Delete
        </Button>
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
