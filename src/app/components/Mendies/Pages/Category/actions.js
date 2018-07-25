import deps from 'dependencies';


export default {
    mount: (data) => (dispatch) => {
        return dispatch({
            type: deps.actionTypes.CATEGORY_MOUNT,
            data,
        });
    },

    addFavorite: (product) => (dispatch) => {
        dispatch({
            type: deps.actionTypes.CATEGORY_FAVORITE_ADD,
            product,
        })
    },

    removeFavorite: (product) => (dispatch) => {
        dispatch({
            type: deps.actionTypes.CATEGORY_FAVORITE_REMOVE,
            product,
        })
    }
};
