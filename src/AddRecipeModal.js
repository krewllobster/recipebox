import React, { Component } from 'react';
import ModalWrapper from './ModalWrapper.js';
import classNames from 'classnames';
import './AddRecipeModal.css';


class AddRecipeModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      parts: [],
      description: '',
    }

    this.onOk = this.props.onOk;
    this.hideModal = this.props.hideModal;
    this.nameChange = this.nameChange.bind(this);
    this.partChange = this.partChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.save = this.save.bind(this);
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
    const {name, parts, description} = this.state;
    let newRecipe = {
      'name': name,
      'parts': parts,
      'description': description,
      'open': false,
    }
    this.onOk(newRecipe);
  }

  render() {

    return (
      <ModalWrapper
        title='Add a new Recipe'
        name='ADD'
        hideModal = {this.hideModal}
        onOk = {this.save}
        okText = 'Save'
      >
        <div className = 'card-header'>
          <label for = 'recipeName' className = 'sr-only'>New Recipe</label>
          <input
            id = 'recipeName'
            type='text'
            className = 'form-control'
            placeholder = 'recipe name'
            onChange = {this.nameChange}/>
        </div>
        <div className = 'card-block'>
          <div className = 'form-group'>
            <label for='recipe-description' className = 'sr-only'>
              Description
            </label>
            <textarea
              className = 'form-control'
              id='recipe-description'
              rows='2'
              onChange = {this.descriptionChange}
              placeholder = 'recipe description'
            />
          </div>

          <label for='recipe-parts' className = 'sr-only'>
            Recipe Parts
          </label>
          <textarea
            className = 'form-control'
            id='recipe-parts'
            rows='2'
            onChange = {this.partChange}
            placeholder = 'ingredients - separate each by a comma'
          />

        </div>
      </ModalWrapper>
    )
  }
}

export default AddRecipeModal;
