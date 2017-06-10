import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddRecipeModal from './AddRecipeModal.js';
import EditRecipeModal from './EditRecipeModal.js';
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
          description: 'a delicious pasta dish',
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

  componentWillMount() {
    const existingRecipes = JSON.parse(localStorage.getItem('recipes'));
    if (existingRecipes) {
      this.setState({recipes: existingRecipes});
    }
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
          transitionEnterTimeout = {100}
          transitionLeaveTimeout = {100}
        >
          <ModalConductor
            active = {activeModal}
            hide = {this.hideModal}
            save = {this.saveRecipe}
            update = {this.updateRecipe}
            toUpdate = {recipes[editIndex]}
            key = {activeModal}
          />
        </CSSTransitionGroup>
      </div>
    );
  }
}

const ModalConductor = ({
  active,
  hide,
  save,
  update,
  toUpdate,
}) => {
  switch (active) {
    case '':
      return null;
    case 'ADD':
      return <AddRecipeModal
        hideModal = {hide}
        onOk = {save}
        title = 'Add Recipe'
      />
    case 'EDIT':
      return <EditRecipeModal
        hideModal = {hide}
        onOk = {update}
        recipe = {toUpdate}
        title = 'Edit Recipe'
        id = 'EDIT'
      />
    default:
      return null;
  }
}

ModalConductor.PropTypes = {
  //props
  active: PropTypes.string.required,
  toEdit: PropTypes.object,
  //funcs
  hide: PropTypes.func.required,
  save: PropTypes.func,
  update: PropTypes.func,
}

ModalConductor.defaultProps = {
  active: '',
  toEdit: {},
}

export default App;
