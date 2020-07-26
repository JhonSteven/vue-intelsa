import types from './../types/students';
import API from './../../config/api';

const state = {};

const actions = {
    [types.actions.addStudent]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            API.post('students', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => reject(error))
        })
    },
    [types.actions.getStudent]: ({}, payload) => {
        return new Promise((resolve, reject) => {
            API.get('students/' + payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => reject(error))
        })
    },
    [types.actions.updateStudent]: ({}, payload) => {
        return new Promise((resolve, reject) => {
            API.put('students/' + payload.id, payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => reject(error))
        })
    },
    [types.actions.deleteStudent]: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            API.delete('students/' + payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => reject(error))
        })
    },
}

export default {
    state,
    actions,
}