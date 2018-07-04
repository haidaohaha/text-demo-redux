import React from 'react';
export default class Grandfather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treasure: '和氏璧'
        };
    }  
    render() {
        return (
            <div>
                <p>爷爷级</p>
                <p>传给后代 : {this.state.treasure}</p>
                <hr />
                <Father />
            </div>
        );
    }
}

class Father extends React.Component {
    render() {
        return (
            <div>
                <p>父亲级</p>
                <p>父级不做操作</p>
                <hr />
                <Son />
            </div>
        );
    }
}

class Son extends React.Component {
    render() {
        return (
            <div>
                <p>儿子级</p>
                <p>读取爷爷级的属性</p>
            </div>
        );
    }
}
