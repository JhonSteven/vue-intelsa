import types from './../types/auth';
import API from './../../config/api';

const state = {
    user: {},
    token: localStorage.getItem('access_token') || '',
    logged: !!localStorage.getItem('access_token')
};

const actions = {
    [types.actions.login]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            API.post('auth/login', payload)
                .then(response => {
                    if (response.data.access_token) {
                        commit(types.mutations.SET_AUTH, response.data.access_token);
                    }
                    resolve(response);
                })
                .catch(error => reject(error))
        })
    },
    [types.actions.me]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            API.get('auth/user')
                .then(response => {
                    if (response.data) {
                        commit(types.mutations.SET_USER, response.data);
                    }
                    resolve(response);
                })
                .catch(error => {
                    commit(types.mutations.SET_AUTH, null);
                    reject(error)
                })
        })
    },
    [types.actions.logout]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            API.post('auth/logout', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => reject(error))
        })
    },
};

const mutations = {
    [types.mutations.SET_AUTH]: (state, accessToken = null) => {
        if (accessToken) {
            localStorage.setItem('access_token', accessToken)
            API.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
            state.logged = true;
        } else {
            localStorage.removeItem('access_token')
            delete API.defaults.headers.common["Authorization"];
            state.logged = false;
        }
    },
    [types.mutations.SET_USER]: (state, user = {}) => {
        state.user = user;
    }
}

export default {
    state,
    actions,
    mutations
}