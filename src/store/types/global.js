import namespace from './../utils/namespace';

export default namespace('global', {
    getters: [
        'loaded',
        'genresOptions',
        'identificationTypesOptions',
        'careersOptions',
    ],
    actions: [
        'getCareers',
        'getGenres',
        'getIdentificationTypes'
    ],
    mutations: [
        'SET_LOADED',
        'SET_GENRES',
        'SET_CAREERS',
        'SET_IDENTIFICATION_TYPES',
    ]
});