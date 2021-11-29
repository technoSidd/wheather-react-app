import React, { Component } from "react";
class Counter extends React.Component {
  // state = {
  //     value: this.props.counter.value,
  //     imageUrl: 'https://picsum.photos/200',
  //     tags: ['tag1','tag2','tag3','tag4','tag5'],
  // };
  styles = {
    fontSize: 10,
    fontWeight: "bold",
  };

  // constructor() {
  //     super();
  //     this.onIncrement = this.onIncrement.bind(this)
  // }

  render() {
    const { counter, children, onDelete, onIncrement } = this.props;
    return (
      <React.Fragment>
        {children}
        {/* <img src={this.state.imageUrl} alt={this.state.imageUrl}></img> */}
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button onClick={() => onIncrement(counter)} className="btn btn-secondary btn-sm">
          Increment
        </button>
        {counter.value > 0 && "Please add more tags!"}
        {this.renderTags()}
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(counter.id)}>
          Delete
        </button>
      </React.Fragment>
    );
  }

  // onIncrement = product => {
  //     // console.log('Increment', product);
  //     this.setState({value: this.state.value+1});
  // }

  renderTags() {
    if (this.props.tags.length === 0) return <p>No tags.</p>;
    return (
      <ul>
        {this.props.tags.map((val) => (
          <li key={val}>{val}</li>
        ))}
      </ul>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
