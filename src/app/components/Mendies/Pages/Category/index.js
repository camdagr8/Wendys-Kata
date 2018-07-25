
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import { connect } from 'react-redux';
import Category from './Category';
import deps from 'dependencies';

/**
 * -----------------------------------------------------------------------------
 * Inject Redux State and Actions into React Component: Category
 * -----------------------------------------------------------------------------
 */
const mapStateToProps = (state, props) => ({
    ...state.Category,
    ...props,
});

const mapDispatchToProps = (dispatch) => ({
    mount: () => dispatch(deps.actions.Category.mount()),
    add: (data) => dispatch(deps.actions.Cart.add(data)),
    remove: (data) => dispatch(deps.actions.Cart.remove(data)),
    addFavorite: (product) => dispatch(deps.actions.Category.addFavorite(product)),
    removeFavorite: (product) => dispatch(deps.actions.Category.removeFavorite(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
