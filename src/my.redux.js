import { ReadStream } from 'tty';

export function createStore(reducer) {
    let currentState = {};
    let currentListeners = [];

    function getState() {
        return currentState;
    }

    function subscribe(listener) {
        currentListeners.push(listener);
    }

    function dispatch(action) {
        currentState = reducer(currentState, action);
        currentListeners.forEach(v => v());
        return action;
    }

    // 初始化
    dispatch({ type: '@@my.redux' });
    return { getState, subscribe, dispatch };
}

// export function addNum() {
//     return { type: INCREMENT };
// }
// 上面的 函数返回的是  一个什么 ？ 是一个 action ，需要dispatch 来执行
// 所以 我们想要的 是 store.dispatch(addNum())
// { addNum, minusNum, AddNumAsync }
// 所谓的“穿透” 没理解
function bindActionCreator(creator, dispatch) {
    return (...args) => {
        console.log('vip-args', args);
        dispatch(creator(...args));
    };
}
export function bindActionCreators(creators, dispatch) {
    console.log('vip-creators', creators);
    console.log('vip-dispatch', dispatch);
    // let bound = [];
    // Object.keys(creators).forEach(v => {
    //     let creator = creators[v];
    //     bound[v] = bindActionCreator(creator, dispatch);
    // });
    // return bound;
    return Object.keys(creators).reduce((rst, item) => {
        rst[item] = bindActionCreator(creators[item], dispatch);
        return rst; // 注意 rst 是一个对象，每次 key 是不同的，这样你就能理解了
    }, {});
}
