import {  RouteInfo } from './sidebar.model';

export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Home',  icon: 'dashboard', class: '' },
    { path: '/user', title: 'User Profile',  icon:'person', class: '' },
    { path: '/login', title: 'Login',  icon:'person', class: '' },
    { path: '/table', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];