import namespace from './../utils/namespace';

export default namespace('students', {
    getters: [
        'students',
    ],
    actions: [
        'getStudents',
        'getStudent',
        'addStudent',
        'updateStudent',
        'deleteStudent',
    ],
    mutations: [
        'RESET_STATE',
    ]
});