import React, { Component } from 'react'

class Form extends Component {
  onChangeInput = (event) => {
    const { target } = event
    const { type, checked, value, name } = target

    const currentValue = type === 'checkbox' ? checked : value

    this.setState({
      [name]: currentValue
    })
  }

  render() {
    return (
      <div>
        This is an Abstract component. Only inherit from this.
      </div>
    )
  }
}

export default Form
