<template>
<ValidationObserver :ref="refForm" v-slot="{ handleSubmit,errors,reset }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
        <slot></slot>
    </b-form>
</ValidationObserver>
</template>
<script>

export default {
    props:{
        refForm: String
    },
    methods:{
        resetForm() {
            return new Promise((resolve) => {
                this.$nextTick(() => {
                    this.$refs[this.refForm].reset();
                });
                resolve()
            });
        },
        onSubmit() {
            let vm = this;
            this.$emit('submit',function(){
                vm.resetForm();
            });
        },
    },
}
</script>