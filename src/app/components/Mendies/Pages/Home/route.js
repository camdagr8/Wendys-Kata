import Home from './index';
import deps from 'dependencies';

export default {
    path: '/',
    exact: true,
    component: Home,
    load: (params, search) => deps.actions.Home.mount(params, search),
};
