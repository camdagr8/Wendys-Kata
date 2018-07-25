import Category from './index';
import deps from 'dependencies';

export default {
    path: '/category/:category',
    exact: true,
    component: Category,
    load: (params, search) => deps.actions.Category.mount(params, search),
};
