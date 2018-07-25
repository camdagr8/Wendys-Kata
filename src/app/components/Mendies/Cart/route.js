import Cart from './index';
import deps from 'dependencies';

export default {
    path: '/cart',
    exact: true,
    component: Cart,
    load: (params, search) => deps.actions.Cart.mount(params, search),
};
