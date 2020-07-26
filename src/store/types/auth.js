import namespace from './../utils/namespace';

export default namespace('auth', {
    getters: [
        'user',
        'logged',
    ],
    actions: [
        'login',
        'register',
        'logout',
        'me',
    ],
    mutations: [
        'RESET_STATE',
        'SET_AUTH',
        'SET_USER',
    ]
});