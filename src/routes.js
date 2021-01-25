const Cadastro = () => System.import('./components/cadastro/Cadastro.vue');

import Home from './components/home/Home.vue'

export const routes = [
    { path: '', component: Home, titulo: 'Home', name: 'home', menu: true},
    { path: '/cadastro', component: Cadastro, titulo: 'Cadastro', name: 'cadastro', menu: true},
    { path: '/cadastro/:id', component: Cadastro, titulo: 'Cadastro', name: 'alterar', menu: false},
    { path: '*', component: Home, menu: false }
];
