// export function applyMiddleware(middleware) { // 单个中间件
export function applyMiddleware(...middlewares) {
    // 多个中间件
    return createStore => (...args) => {
        // 获取原生的
        const store = createStore(...args);
        let dispatch = store.dispatch;

        // 对原生的进行扩展
        const midApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        };

        // 使用 middleware 方法，扩展
        // dispatch = middleware(midApi)(store.dispatch);
        const middlewareChain = middlewares.map(middleware => middleware(midApi));

        dispatch = compose(...middlewareChain)(store.dispatch);
        // 下面这句话，如果不理解，断点看一下
        // dispatch = middleware(midApi)(store.dispatch)(action);
        return {
            ...store,
            dispatch
        };
    };
}

// compose(fn1,fn2,fn3,fn4)
// 实现这种输出 fn1(fn2(fn3(fn4())))

export function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((rst, item) => (...args) => rst(item(...args)));
}

export function createStore(reducer, enhance) {
    if (enhance) {
        return enhance(createStore)(reducer);
    }
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
    let bound = [];
    Object.keys(creators).forEach(v => {
        let creator = creators[v];
        bound[v] = bindActionCreator(creator, dispatch);
    });
    return bound;
    // return Object.keys(creators).reduce((rst, item) => {
    //     rst[item] = bindActionCreator(creators[item], dispatch);
    //     return rst; // 注意 rst 是一个对象，每次 key 是不同的，这样你就能理解了
    // }, {});

    // reduce 遍历之后，需要累加 操作的
}
