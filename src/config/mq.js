import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints: {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: Infinity,
    }
})
Vue.mixin({
    computed: {
        isPC() {
            return this.$mq === 'lg' || this.$mq === 'xl'
        },
        isMobile() {
            return this.$mq === 'sm' || this.$mq === 'xs'
        },
    }
})