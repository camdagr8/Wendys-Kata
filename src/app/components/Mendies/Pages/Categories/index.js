
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import { connect } from 'react-redux';
import Categories from './Categories';
import deps from 'dependencies';

/**
 * -----------------------------------------------------------------------------
 * Inject Redux State and Actions into React Component: Categories
 * -----------------------------------------------------------------------------
 */
const mapStateToProps = (state, props) => ({
    ...state.Categories,
    ...props,
});

const mapDispatchToProps = (dispatch) => ({
    mount: () => dispatch(deps.actions.Categories.mount())
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
