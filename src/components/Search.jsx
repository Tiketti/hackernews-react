import React, { Component } from 'react';

class Search extends Component {
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
          onSubmit={onSubmit}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );
  }
}

export default Search;
