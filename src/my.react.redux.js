import React from 'react';
import PropTypes from 'prop-types';

// import { bindActionCreators } from 'redux'; // 使用原始的是没有问题的
import { bindActionCreators } from './my.redux'; // 自己写一个

// 简述： context 的作用， 链接组件  组件的属性，放入store ，再更新其它组件
// connect 是一种组件书写的套路 ， 首先先传入 组件（wrapcomponent） 最终 还是返回这个组件
// 中间发生了什么？ 我们把传入的 属性和方法，绑在 wrapcomponent ,注意最终渲染的谁， {...this.props, ...this.state }
// 多层高阶函数 最终是不是 只返回 wrap component , 都是操作这之间的属性 和 方法
export const connect = (
    mapStateToProps = state => state,
    mapDispatchToProps = {}
) => WrapComponent => {
    return class ConnectComponent extends React.Component {
        static contextTypes = {
            store: PropTypes.object
        };
        constructor(props, context) {
            super(props, context);
            // 高阶的用法，属性要变成用法，传给目标组件就是当前高阶组件的state，
            // 高阶组件的父辈，的属性方法，需要当前高阶组件过滤一下，准确实现想要的属性和方法
            this.state = { props: {} };
        }

        // 生命周期， 你懂的，组件DOM 完成，开始执行
        // 组件已经完全挂载到网页上才会调用被执行
        componentDidMount() {
            const { store } = this.context;
            store.subscribe(() => this.update());
            this.update();
        }

        // 获取 mapStateToProps 和 mapDispatchToProps 为扩展到 目标组件内准备
        update() {
            const { store } = this.context; // 拿取祖传之物
            const stateProps = mapStateToProps(store.getState());

            // 比较复杂的来了...
            // 实现下面的函数
            // export function addNum() {
            //     return { type: INCREMENT };
            // }
            // 上面的 函数返回的是  一个什么 ？ 是一个 action ，需要dispatch 来执行
            // 所以 我们想要的 是 store.dispatch(addNum())
            const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
            // console.log('vip-ddd', dispatchProps());
            this.setState({
                props: {
                    ...this.state.props,
                    ...stateProps,
                    ...dispatchProps
                }
            });
        }

        render() {
            return <WrapComponent {...this.state.props} />;
        }
    };
};

// 一个全局的支持 ， 将 store 存入 context 内
// Provider 就是一个 爱的提供者 ， 无私贡献 ， 无私支持
export class Provider extends React.Component {
    static childContextTypes = {
        store: PropTypes.object
    };
    constructor(props, context) {
        super(props, context);
        this.store = props.store; // 这句话, 让被供养的组件能使用 store
    }
    getChildContext() {
        return { store: this.store };
    }

    render() {
        return this.props.children;
    }
}
