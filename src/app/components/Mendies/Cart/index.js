
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import { connect } from 'react-redux';
import Cart from './Cart';
import deps from 'dependencies';

/**
 * -----------------------------------------------------------------------------
 * Inject Redux State and Actions into React Component: Cart
 * -----------------------------------------------------------------------------
 */
const mapStateToProps = (state, props) => ({
    ...state.Cart,
    ...props,
});

const mapDispatchToProps = (dispatch) => ({
    add    : (data) => dispatch(deps.actions.Cart.add(data)),
    hide   : () => dispatch(deps.actions.Cart.hide()),
    mount  : (data) => dispatch(deps.actions.Cart.mount(data)),
    remove : (data) => dispatch(deps.actions.Cart.remove(data)),
    show   : () => dispatch(deps.actions.Cart.show()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
