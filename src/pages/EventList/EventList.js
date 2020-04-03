import React, { Component } from "react";
import Search from "../../components/Search/Search";
import List from "../../components/List/List";

import allEvents from "../../List.json";

const IMEMS_PER_PAGE = 10;

// import List from '../../List.json'

class EventList extends Component {
  state = {
    activePage: 1,
    filterPlace: "",
    filterRun: "",
    filterDistance: "0",
    list: allEvents
  };

  handleFilterPlace = filterPlace =>
    this.setState({ filterPlace: filterPlace });
  handleFilterDistance = filterDistance =>
    this.setState({ filterDistance: filterDistance });
  handleFilterRun = filterRun => this.setState({ filterRun: filterRun });

  componentDidMount() {
      const list = JSON.parse(localStorage.getItem('eventList'))
      list && this.setState({list})
  }
  
  render() {
    const { filterPlace, filterDistance, filterRun } = this.state;
    const evetsFiltered = allEvents;
    const totalPages = Math.ceil(evetsFiltered.length / IMEMS_PER_PAGE);
    const eventsOnActivePage = evetsFiltered.filter(
      (el, i) =>
        i >= (this.state.activePage - 1) * IMEMS_PER_PAGE &&
        i < this.state.activePage * IMEMS_PER_PAGE
    );

    return (
      <div>
        <Search
          filterPlace={filterPlace}
          filterDistance={filterDistance}
          filterRun={filterRun}
          onFilterPlaceChange={this.handleFilterPlace}
          onFilterDistanceChange={this.handleFilterDistance}
          onFilterRunChange={this.handleFilterRun}
        />
        <List
          events={eventsOnActivePage}
          activePage={this.state.activePage}
          onPageChange={(e, { activePage }) => this.setState({ activePage })}
          totalPages={totalPages}
          filterPlace={filterPlace}
          filterDistance={filterDistance}
          filterRun={filterRun}
          list={this.state.list}
        />
      </div>
    );
  }
}

export default EventList;
