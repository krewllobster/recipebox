import React, { Component } from 'react';
import AddRecipeModal from './AddRecipeModal.js';
import RecipeBox from './RecipeBox.js'
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
    this.showRecipe = this.showRecipe.bind(this);
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
    let newRecipes = this.state.recipes;
    newRecipes.push(obj);
    this.setState({recipes: newRecipes})
  }

  deleteRecipe(index) {
    console.log('deleting index ' + index);
    let newRecipes = this.state.recipes;
    newRecipes.splice(index, 1);
    console.log(newRecipes);
    this.setState({recipes: newRecipes})
  }

  showRecipe(index) {
    const recipes = this.state.recipes;
    recipes.map((item, i) => item.open = i === index ? !item.open : false)
    this.setState({recipes: recipes})
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
            showRecipe = {this.showRecipe}
          />
        </div>
        <CSSTransitionGroup
          transitionName = 'modal'
          transitionAppear = {true}
          transitionEnterTimeout = {200}
          transitionAppearTimeout = {200}
          transitionLeaveTimeout = {100}
        >
          <ModalConductor
            active = {activeModal}
            hideModal = {this.hideModal}
            saveRecipe = {this.saveRecipe}
            updateRecipe = {this.updateRecipe}
            recipeToEdit = {recipes[editIndex]}
            key = {activeModal}
          />
        </CSSTransitionGroup>
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
        id = 'EDIT'
      />
    default:
      return null;
  }
}

export default App;
