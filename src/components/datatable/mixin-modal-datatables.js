let mixinModalDatatable = {
    data() {
        return {
            idToDelete: null,
            idToDisable: null,
            showTransitionModal: true
        }
    },
    methods: {
        resetModalDatatable() {
            this.idToDelete = null;
            this.idToDisable = null;
        },
        deleteResult(id) {
            this.idToDelete = id
            this.$bvModal.show('modal-delete')
        },
        disableResult(id) {
            this.idToDisable = id
            this.$bvModal.show('modal-disable')
        },
        dataDisabled(disabledId) {
            let vm = this
                //Delay to hide text changed in modal-disable
            setTimeout(() => {
                let disabledItem = vm.results.find(r => r[vm.primaryKey] == disabledId)
                disabledItem.deleted_at = disabledItem.deleted_at ? null : new Date();
            }, 200)
        },
        dataDeleted(deletedId) {
            this.results = this.results.filter(r => r[this.primaryKey] !== deletedId)
        },
    }
}
export default mixinModalDatatable