const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const initState = 0;
// 纯函数暴露出去
export function counter(state = initState, action) {
    console.log('vip-index-redux', state);
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return 10;
    }
}

export function addNum() {
    return { type: INCREMENT };
}
export function minusNum() {
    return { type: DECREMENT };
}
export function AddNumAsync() { // 缺少中间件 实现不了异步操作
    return dispatch => {
        setTimeout(() => {
            dispatch(addNum);
        }, 1000);
    };
}
