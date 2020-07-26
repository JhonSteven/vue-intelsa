import { mapActions, mapGetters } from 'vuex'
import studentTypes from './../store/types/students'
import globalTypes from './../store/types/global'

let studentMixin = {
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        ...mapGetters({
            identificationTypeOptions: globalTypes.getters.identificationTypesOptions,
            genreOptions: globalTypes.getters.genresOptions,
            careerOptions: globalTypes.getters.careersOptions,
        })
    },
    methods: {
        ...mapActions({
            addStudent: studentTypes.actions.addStudent,
            updateStudent: studentTypes.actions.updateStudent,
            getCareers: globalTypes.actions.getCareers,
            getGenres: globalTypes.actions.getGenres,
            getIdentificationTypes: globalTypes.actions.getIdentificationTypes,
            getStudentStore: studentTypes.actions.getStudent
        }),
    },
    async created() {
        await this.getCareers();
        await this.getGenres();
        await this.getIdentificationTypes();
    }
}
export default studentMixin