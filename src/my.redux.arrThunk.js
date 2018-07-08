const arrThunk = ({ getState, dispatch }) => next => action => {
    // 符合中间件定义，
    // 则在本层执行 dispatch 使用新的参数，
    // 重新走一下 执行流程
    if (Array.isArray(action)) {
        return action.forEach(v => {
            // return next(v); // 不推荐,实测也可以使用
            return dispatch(v); // 推荐使用这种
        });
    }

    // 不符合 使用 next 到下一个流程
    return next(action);
};

export default arrThunk;
