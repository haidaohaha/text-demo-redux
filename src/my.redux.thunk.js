const thunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }
    // 默认什么都不干， 即当前的中间件不执行，执行下一层中间件  
    return next(action);
};

export default thunk;

// 理解：
// thunk 是给 applyMiddleware 用的
// midApi 就是 thunk 函数的参数  getState、 dipatch 
// next 是第二层 store.dispatch (next 随机书写的，含义是下一个中间件)
// 
