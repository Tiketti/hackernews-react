import React, { Component } from 'react';
import './App.css';
// import Welcome from './components/Welcome';
import Clock from './components/Clock';
import Button from './components/Button';
import Search from './components/Search';
import Table from './components/Table';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id);
    this.setState({ result: { ...this.state.result, hits: updatedHits } });
  }

  onSearchChange(event) {
    // eslint-disable-next-line no-console
    console.log(`search term: ${this.state.searchTerm}`);
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  async fetchSearchTopStories(searchTerm, page = 0) {
    try {
      const response = await fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`);
      const result = await response.json();

      this.setSearchTopStories(result);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;

    if (!result) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Button onClick={() =>
            this.fetchSearchTopStories(searchTerm, page + 1)}
          >
            More
          </Button>
          <Clock />
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
          Search
          </Search>
          {result
            ? <Table
              list={result.hits}
              onDismiss={this.onDismiss}
            />
            : null
          }
        </div>
      </div>
    );
  }
}

export default App;
