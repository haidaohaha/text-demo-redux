import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { connect } from './my.react.redux';
import { addNum, minusNum, AddNumAsync } from './index.redux';
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
    handleAddNumAsync() {
        setTimeout(() => {
            this.setState({
                num: this.state.num + 1
            });
        }, 1000);
    }
    render() {
        console.log('vip-props', this.props);
        // return <p>1234</p>
        return (
            <div>
                <h2>受控制的数字：{this.props.num}</h2>
                <button onClick={this.props.addNum}>数字加一</button>
                <button onClick={this.props.minusNum}>数字减一</button>
                <button onClick={this.props.AddNumAsync}>拖1s再加一</button>
                {/* <button onClick={this.handleAddNumAsync.bind(this)}>拖1s再加一</button> */}
            </div>
        );
    }
}

App = connect(
    state => ({ num: state }),
    { addNum, minusNum, AddNumAsync }
)(App);

export default App;
