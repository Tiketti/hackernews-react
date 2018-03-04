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
const PARAM_HITSPERPAGE = 'hitsPerPage=';
const DEFAULT_HITSPERPAGE = '2';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const updatedHits = hits.filter(item => item.objectID !== id);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
    });
  }

  onSearchChange(event) {
    // eslint-disable-next-line no-console
    console.log(`search term: ${this.state.searchTerm}`);
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    event.preventDefault();

    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits,
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
    });
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  async fetchSearchTopStories(searchTerm, page = 0) {
    try {
      const response = await fetch(`${PATH_BASE}${PATH_SEARCH}\
?${PARAM_SEARCH}${searchTerm}\
&${PARAM_PAGE}${page}\
&${PARAM_HITSPERPAGE}${DEFAULT_HITSPERPAGE}`);

      const result = await response.json();

      this.setSearchTopStories(result);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  render() {
    const { searchTerm, results, searchKey } = this.state;
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Button onClick={() =>
            this.fetchSearchTopStories(searchKey, page + 1)}
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
          <Table
            list={list}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    );
  }
}

export default App;
