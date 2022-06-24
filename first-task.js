/**
 * Question 1:
 * What are the issues in the page, how would you fix it?
 */

import React from "react";
import { connect } from "react-redux";
//Fix: import fetchPeople function
import { fetchPeople } from "./utils.js";

const map = (a, b) => {
  const newArray = [];
  for (let i = 0; i < a.length; i++) {
    newArray.push({ a: a[i], b: b[i] });
  }
  return newArray;
};

const mapCompaniesIntoPeople = (people, companies) => {
  /* Map Company names into each person that they work for */
  // Fix: I assumed that people and companies would be separated arrays, that are supposed to be mapped by common index
  return map(people, companies);
};

const mapPeopleIntoHouses = (houses, people) => {
  /* Map people into house who live in the house */
  return map(houses, people);
};

const House = ({ data }) => {
  return renderData(data);
};
const People = ({ data }) => {
  return renderData(data);
};

const renderData = data => {
  return (
    <div>
      {data.map((element, index) => (
        <div key={index}>
          {element.a} - {element.b}
        </div>
      ))}
    </div>
  );
};

class App extends React.Component {
  // Fix: dispatch fetchPeople when component mounts
  componentDidMount() {
    this.props.fetchPeople();
  }
  render() {
    // Issue: this.props.fetchPeople() in render
    return (
      <div className="main">
        <People data={this.props.people} />
        <House data={this.props.houses} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  //   Issue: {people: {data}} wrong syntax i think, and redeclaring {houses} variabe
  //   const { people: { data }, companies, houses } = state;

  //   Fix: rename people and houses variables
  const { people: data, companies, houses: housesData } = state;
  const people = mapCompaniesIntoPeople(data, companies);
  const houses = mapPeopleIntoHouses(housesData, data);
  return {
    people,
    houses,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPeople: () => dispatch(fetchPeople()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
