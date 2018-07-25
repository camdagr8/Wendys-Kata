import deps from 'dependencies';

export default {
    mount: (data) => (dispatch) => {
        return dispatch({
            type: deps.actionTypes.CATEGORIES_MOUNT,
            data,
        });
    },
};
