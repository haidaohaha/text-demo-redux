import React from 'react';
import PropsTypes from 'prop-types';
export class Grandfather extends React.Component {
    static childContextTypes = {
        treasure: PropsTypes.string
    };
    constructor(props) {
        super(props);
        this.state = {
            treasure: '和氏璧'
        };
    }
    getChildContext() {
        return this.state;
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
    static contextTypes = {
        treasure: PropsTypes.string
    };
    render() {
        console.log('vip-context', this.context);
        return (
            <div>
                <p>儿子级</p>
                <p>继承爷爷级的属性 : {this.context.treasure}</p>
            </div>
        );
    }
}
