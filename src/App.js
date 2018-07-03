import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        };
    }
    handleAddGunAsync() {
        setTimeout(() => {
            this.setState({
                num: this.state.num + 1
            });
        }, 1000);
    }
    render() {
        return (
            <div>
                <h2>受控制的数字：{this.state.num}</h2>
                <button onClick={() => this.setState({ num: this.state.num + 1 })}>数字加一</button>
                <button onClick={() => this.setState({ num: this.state.num - 1 })}>数字减一</button>
                <button onClick={this.handleAddGunAsync.bind(this)}>拖1s再加一</button>
            </div>
        );
    }
}

export default App;
