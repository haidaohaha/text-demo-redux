import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { connect } from './my.react.redux';
import { addNum, minusNum, AddNumAsync, AddNumRandom } from './index.redux';
// @connect(
//     state => state,
//     { addNum, minusNum, AddNumAsync }
// )
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        };
    }
    render() {
        return (
            <div>
                <h2>受控制的数字：{this.props.num}</h2>
                <button onClick={this.props.addNum}>数字加一</button>
                <button onClick={this.props.minusNum}>数字减一</button>
                <button onClick={this.props.AddNumAsync}>拖1s再加一</button>
                <button onClick={this.props.AddNumRandom}>增加多吧</button>
            </div>
        );
    }
}

App = connect(
    state => ({ num: state }),
    { addNum, minusNum, AddNumAsync, AddNumRandom }
)(App);

export default App;
