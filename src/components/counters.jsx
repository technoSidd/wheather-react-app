import React, { Component } from 'react';
import Counter from './counter';

class Counters extends React.Component {
    state = {
        counters: [
            {id:1, value:1},
            {id:2, value:2},
            {id:3, value:3},
            {id:4, value:4},
            {id:5, value:5},
        ],
        tags: ['tag1'],
    }
    render() { 
        return (<div>
            <button className="btn btn-primary btn-sm m-2" onClick={this.handleReset}>Reset</button>
            {this.state.counters.map(val => 
            <Counter key={val.id} counter={val} tags={this.state.tags} onDelete={this.handleDelete} onIncrement={this.handleIncrement}>
                <p>Counter #{val.id}</p>
            </Counter>)}
        </div>); 
    }

    handleDelete = (id) => {
        let arr = this.state.counters.filter(val => val.id !== id)
        this.setState({counters: arr})
    }

    handleReset = () => {
        const counters = this.state.counters.map(val => {
            val.value = 0;
            return val;
        })
        this.setState({counters})
    }

    handleIncrement = (counter) => {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = { ...counter };
        counters[index].value++;
        this.setState({counters});
    }
}
 
export default Counters;