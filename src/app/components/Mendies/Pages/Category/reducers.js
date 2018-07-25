import deps from 'dependencies';
import _ from 'underscore';

export default (state = {}, action) => {

    let newState, favorites;

    switch (action.type) {

        case deps.actionTypes.CATEGORY_MOUNT:
            newState = { ...state, ...action.data };
            return newState;

        case deps.actionTypes.CATEGORY_FAVORITE_ADD:
            newState = { ...state };

            favorites = state.favorites || [];
            favorites.push(action.product);
            favorites = _.uniq(favorites);

            newState['favorites'] = favorites;
            newState['update'] = Date.now();

            return newState;

            case deps.actionTypes.CATEGORY_FAVORITE_REMOVE:
                newState = { ...state };

                favorites = state.favorites || [];
                favorites = _.uniq(favorites);
                favorites = _.without(favorites, action.product);

                newState['favorites'] = favorites;
                newState['update'] = Date.now();

                return newState;

        default:
            return state;
    }
};
