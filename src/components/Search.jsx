import React, { Component } from 'react';

class Search extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.select();
    }
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      children,
    } = this.props;
    return (
      <form onSubmit={onSubmit}>
        {children}
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={(node) => { this.input = node; }}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );
  }
}

export default Search;
