import Categories from './index';
import deps from 'dependencies';

export default {
    path: ['/categories', '/order'],
    exact: true,
    component: Categories,
    load: (params, search) => deps.actions.Categories.mount(params, search),
};
