import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import API from './../config/api'

import authModule from './modules/auth';
import studentsModule from './modules/students';

import globalTypes from './types/global'

function initialState() {
    return {
        loaded: false,
        genres: [],
        careers: [],
        identificationTypes: [],
    }
}

export default new Vuex.Store({
    state: initialState(),
    mutations: {
        [globalTypes.mutations.SET_LOADED](state, payload) {
            state.loaded = payload;
        },
        [globalTypes.mutations.SET_GENRES](state, payload) {
            state.genres = payload;
        },
        [globalTypes.mutations.SET_CAREERS](state, payload) {
            state.careers = payload;
        },
        [globalTypes.mutations.SET_IDENTIFICATION_TYPES](state, payload) {
            state.identificationTypes = payload;
        },
    },
    getters: {
        [globalTypes.getters.genresOptions]: (state) => {
            return state.genres.map(genre => {
                return { value: genre.id, text: genre.genre }
            });
        },
        [globalTypes.getters.identificationTypesOptions]: (state) => {
            return state.identificationTypes.map(identificationType => {
                return { value: identificationType.id, text: identificationType.identification_type }
            });
        },
        [globalTypes.getters.careersOptions]: (state) => {
            return state.careers.map(career => {
                return { value: career.id, text: career.career }
            });
        },
    },
    actions: {
        [globalTypes.actions.getGenres]: ({ commit }) => {
            return new Promise((resolve, reject) => {
                API.get('genres')
                    .then(response => {
                        if (response.data) {
                            commit(globalTypes.mutations.SET_GENRES, response.data);
                        }
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        [globalTypes.actions.getIdentificationTypes]: ({ commit }) => {
            return new Promise((resolve, reject) => {
                API.get('identification-types')
                    .then(response => {
                        if (response.data) {
                            commit(globalTypes.mutations.SET_IDENTIFICATION_TYPES, response.data);
                        }
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        [globalTypes.actions.getCareers]: ({ commit }) => {
            return new Promise((resolve, reject) => {
                API.get('careers')
                    .then(response => {
                        if (response.data) {
                            commit(globalTypes.mutations.SET_CAREERS, response.data);
                        }
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    },
    modules: {
        authModule,
        studentsModule
    }
})