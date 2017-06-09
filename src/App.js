import React, { Component } from 'react';
import classNames from 'classnames';
import AddRecipeModal from './AddRecipeModal.js';
import { CSSTransitionGroup } from 'react-transition-group';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeModal: '',
      editIndex: null,
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
    this.updateRecipe = this.updateRecipe.bind(this);
    this.setEditID = this.setEditID.bind(this);
  }

  hideModal() {
    this.setState({activeModal: ''})
  }

  activateModal(e, index = null) {
    this.setState({
      activeModal: e.target.value,
      editIndex: index
    })

  }

  setEditID(index) {
    this.setState({editID: index})
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

  updateRecipe(obj) {
    this.setState(prevState => {
      prevState.recipes[prevState.editIndex] = obj;
      return (
        {
          recipes: prevState.recipes,
          editIndex: null
        }
      )
    })
  }

  render() {

    const {recipes, activeModal, editIndex} = this.state;

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
          updateRecipe = {this.updateRecipe}
          recipeToEdit = {recipes[editIndex]}
        />
      </div>
    );
  }
}

const ModalConductor = ({
  active,
  hideModal,
  saveRecipe,
  updateRecipe,
  recipeToEdit,
}) => {
  switch (active) {
    case '':
      return null;
    case 'ADD':
      return <AddRecipeModal
        hideModal = {hideModal}
        onOk = {saveRecipe}
      />
    case 'EDIT':
      return <AddRecipeModal
        hideModal = {hideModal}
        onOk = {updateRecipe}
        recipe = {recipeToEdit}
      />
    default:
      return null;
  }
}

const Recipe = ({item, id, deleteRecipe, activateModal}) => {

  const Details = ({item, id, deleteRecipe, activateModal}) => {
    return (
      <div>
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
                value = 'EDIT'
                onClick = {(event) => activateModal(event, id)}
                cName = 'btn btn-secondary'
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className = 'card recipe'>
      <div className = 'card-header'>
        <a className="recipeName">{item.name}</a>
      </div>
      <div className=''>
        <Details
          item = {item}
          id = {id}
          deleteRecipe = {deleteRecipe}
          activateModal = {activateModal}
        />
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
          activateModal = {activateModal}
          deleteRecipe = {deleteRecipe}
        />
      )}
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


const Button = ({type, index, selected, onClick, value, children, cName}) => {

  const buttonClass = classNames(
    cName,
    {'button-active': selected === value}
  )
  return (
    <button
      index = {index}
      className = {buttonClass}
      onClick = {onClick}
      value = {value}
    >{children}</button>
  )
}

export default App;
