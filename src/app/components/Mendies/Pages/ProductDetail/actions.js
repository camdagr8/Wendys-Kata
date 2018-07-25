import deps from 'dependencies';

export default {
    mount: (data) => (dispatch) => {
        return dispatch({
            type: deps.actionTypes.PRODUCTDETAIL_MOUNT,
            data,
        });
    },
};
