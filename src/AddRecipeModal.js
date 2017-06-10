import React, { Component } from 'react';
import ModalWrapper from './ModalWrapper.js';
import './AddRecipeModal.css';


class AddRecipeModal extends Component {

  constructor(props) {
    super(props);

    const {recipe} = this.props

    this.state = {
      name: recipe ? recipe.name : '',
      parts: recipe ? recipe.parts : [],
      description: recipe ? recipe.description : '',
      open: recipe ? true : false,
    }

    this.onOk = this.props.onOk;
    this.hideModal = this.props.hideModal;
    this.nameChange = this.nameChange.bind(this);
    this.partChange = this.partChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.save = this.save.bind(this);
    this.focus = this.focus.bind(this);
  }

  focus() {
    this.textInput.focus();
  }

  nameChange(e) {
    this.setState({name: e.target.value})
  }

  descriptionChange(e) {
    this.setState({description: e.target.value})
  }

  partChange(e) {
    this.setState({
      parts: e.target.value.split(','),
    })
  }

  save() {
    const {name, parts, description, open} = this.state;
    let newRecipe = {
      'name': name,
      'parts': parts,
      'description': description,
      'open': open
    }
    this.onOk(newRecipe);
  }

  update() {
    const {name, parts, description} = this.state;
    let newRecipe = {
      'name': name,
      'parts': parts,
      'description': description,
      'open': false,
    }
    this.updateRecipe(newRecipe);
  }

  componentDidMount() {
    this.focus();
  }

  render() {

    const {name, parts, description} = this.state;

    return (
      <ModalWrapper
        title='Add a new Recipe'
        name='ADD'
        hideModal = {this.hideModal}
        onOk = {this.save}
        okText = 'Save'
      >
        <div className = 'card-header text-center'>
          <h2 className = 'lead'>
            {this.props.recipe
              ? 'Edit recipe'
              : 'Add recipe'
            }
          </h2>
        </div>
        <div className = 'card-block'>
          <div className = 'form-group'>
            <label htmlFor = 'recipeName' className = 'sr-only'>New Recipe</label>
            <input
              id = 'recipeName'
              type='text'
              className = 'form-control'
              placeholder = 'recipe name'
              onChange = {this.nameChange}
              value = {name}
              ref = {c => this.textInput = c}
            />
          </div>
          <div className = 'form-group'>
            <label htmlFor='recipe-description' className = 'sr-only'>
              Description
            </label>
            <textarea
              className = 'form-control'
              id='recipe-description'
              rows='3'
              onChange = {this.descriptionChange}
              placeholder = 'recipe description'
              value = {description}
            />
          </div>

          <label htmlFor='recipe-parts' className = 'sr-only'>
            Recipe Parts
          </label>
          <textarea
            className = 'form-control'
            id='recipe-parts'
            rows='3'
            onChange = {this.partChange}
            placeholder = 'ingredients - separate each by a comma'
            value = {parts}
          />

        </div>
      </ModalWrapper>
    )
  }
}

export default AddRecipeModal;
