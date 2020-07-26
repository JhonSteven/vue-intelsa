<template>
    <button :type="type" :disabled="disabled || loading" @click="$emit('click')" class="btn">
        <fa-icon icon="spinner" class="mr-1" :spin="loading" v-if="loading"/> <slot></slot>
    </button>
</template>
<script>
export default {
    props:{
        type: {
            type:String,
            default: function(){
                return 'submit'
            }
        },
        spinnerClass: String,
        disabled: {
            type:Boolean,
            default: function(){
                return false
            }
        },
        loading: Boolean,
    }
}
</script>
<style lang="scss" scoped>
.spinner-border{
    width: 1rem;
    height: 1rem;
}
</style>