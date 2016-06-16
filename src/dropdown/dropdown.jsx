import cs from 'classnames'
import _ from 'lodash'
import React, { Component, PropTypes } from 'react'

class Dropdown extends Component {
  constructor (props) {
    super(props)

    this.state = { open: false }
  }

  render () {
    return (
      <div className={cs('dropdown', this.props.className, { open: this.state.open })}>
        <button onClick={this._toggleOpen}>
          {this.props.renderItem(this.props.chosen)}
          {this._caret()}
        </button>
        {this._items()}
      </div>
    )
  }

  _caret () {
    if (!this.props.others.length) return null

    return (
      <span>
        <span className='dropdown-caret'></span>
        <span className='sr-only'>Toggle Dropdown</span>
      </span>
    )
  }

  _toggleOpen = () => {
    this.setState({ open: !this.state.open })
  }

  _items () {
    if (!this.props.others.length) return null

    return (
      <ul className='dropdown-menu'>
        {_.map(this.props.others, (item) => (
          <li
            key={item[this.props.keyProperty]}
            tabIndex='0'
            onClick={() => this._onSelect(item)}
          >{this.props.renderItem(item)}</li>
        ))}
      </ul>
    )
  }

  _onSelect (item) {
    this.setState({ open: false })
    this.props.onSelect(item)
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  chosen: PropTypes.object.isRequired,
  others: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  // property for unique value on each item that can be used as its key
  keyProperty: PropTypes.string.isRequired,
}

Dropdown.defaultProps = {
  className: '',
}

export default Dropdown
