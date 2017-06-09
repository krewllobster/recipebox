import React, { Component } from 'react';
import classNames from 'classnames';
import AddRecipeModal from './AddRecipeModal.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeModal: '',
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
      ]
    }

    this.hideModal = this.hideModal.bind(this);
    this.activateModal = this.activateModal.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  hideModal() {
    this.setState({activeModal: ''})
  }

  activateModal(e) {
    this.setState({activeModal: e.target.value})
  }

  saveRecipe(obj) {
    this.setState(prevState => {
      recipes: prevState.recipes.push(obj)
    })
  }

  deleteRecipe(index) {
    this.setState(prevState => {
      recipes: prevState.recipes.splice(index)
    })
  }

  render() {

    const {recipes, activeModal} = this.state;

    return (
      <div>
        <div className = 'flex-container main'>
          <RecipeBox
            recipes = {recipes}
            activateModal = {this.activateModal}
            deleteRecipe = {this.deleteRecipe}
          />
        </div>
        <ModalConductor
          active = {activeModal}
          hideModal = {this.hideModal}
          saveRecipe = {this.saveRecipe}
        />
      </div>
    );
  }
}

const ModalConductor = ({active, hideModal, saveRecipe}) => {
  switch (active) {
    case '':
      return null;
    case 'ADD':
      return <AddRecipeModal
        hideModal = {hideModal}
        onOk = {saveRecipe}
      />
    default:
      return null;
  }
}

const Recipe = ({item, id, deleteRecipe}) => {

  return (
    <div className = 'card recipe'>
      <div className = 'card-header'>
        <a className="recipeName">{item.name}</a>
      </div>
      <div className='toggle-on'>
        <div className = 'card-block'>
          <p className = 'card-text description'>
            {item.description}
          </p>
        </div>
        <ul className = "list-group list-group-flush">
          {item.parts.map((part, i) => (
            <li key = {i} className = 'list-group-item'>{part}</li>
          ))}
        </ul>
        <div className = 'card-footer'>
          <div className = 'row'>
            <div className = 'col-sm-3 col-6'>
              <Button
                type = 'button'
                value = 'delete'
                onClick = {() => {deleteRecipe(id)}}
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

const RecipeBox = ({recipes, activateModal, deleteRecipe}) =>
  <div className = 'card'>
    <div className = 'card-header'>
      <h4 className = 'card-title'>RecipeBox</h4>
    </div>
    <div className = 'card-block'>
      {recipes.map((item, i) =>
        <Recipe
          key = {i}
          id = {i}
          item = {item}
          deleteRecipe = {deleteRecipe}
        />)}
    </div>
    <div className = 'card-footer'>
      <Button
        value = 'ADD'
        onClick = {activateModal}
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
