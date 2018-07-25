import ProductDetail from './index';
import deps from 'dependencies';

export default {
    path: '/category/:category/:product',
    exact: true,
    component: ProductDetail,
    load: (params, search) => deps.actions.ProductDetail.mount(params, search),
};
