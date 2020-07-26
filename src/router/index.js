import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import store from './../store'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login,
        meta: { title: 'Iniciar sesión' },
        beforeEnter: (to, from, next) => {
            if (store.state.authModule.logged) {
                next({ name: 'Students' });
            } else {
                next();
            }
        }
    },
    {
        path: '/students',
        name: 'Students',
        component: () =>
            import ( /* webpackChunkName: "students" */ '../views/students/Index.vue'),
        meta: { title: 'Estudiantes Universidad X', auth: true },
    },
    {
        path: '/students/add',
        name: 'AddStudent',
        component: () =>
            import ( /* webpackChunkName: "studentForm" */ '../views/students/StudentForm.vue'),
        meta: { title: 'Agregar estudiante Universidad X', auth: true },
    },
    {
        path: '/students/:id',
        name: 'Student',
        component: () =>
            import ( /* webpackChunkName: "student" */ '../views/students/Student.vue'),
        meta: { title: 'Estudiante Universidad X', auth: true },
    },
    {
        path: '/students/:id/edit',
        name: 'EditStudent',
        component: () =>
            import ( /* webpackChunkName: "editStudent" */ '../views/students/StudentForm.vue'),
        meta: { title: 'Editar estudiante Universidad X', auth: true },
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.hasOwnProperty('meta') && to.meta.hasOwnProperty('auth') && to.meta.auth && !store.state.authModule.logged) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    document.title = ((to.meta && to.meta.title) ? to.meta.title + ' - ' : '') + 'Intelsa';
});

export default router