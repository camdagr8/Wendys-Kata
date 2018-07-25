import deps from 'dependencies';

export default {
    mount: (data) => (dispatch) => {
        return dispatch({
            type: deps.actionTypes.HOME_MOUNT,
            data,
        });
    },
};
