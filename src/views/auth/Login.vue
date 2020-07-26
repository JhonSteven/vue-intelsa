<template>
  <div class="col-12 col-md-8 col-lg-6 col-xl-4">
    <h1 class="mt-0 text-center">Iniciar sesión</h1>
    <div class="card p-4">
      <v-form refForm="login" @submit="login">
        <div class="p-4 bg-warning mb-4">
          Usuario: demo@demo.com<br>
          Password: demo12345
        </div>
        <div>
          <v-input rules="required|email" name="email" v-model="user.email"/>
          <v-input rules="required|min:5" name="password" v-model="user.password"/>
          <v-button type="submit" :loading="loading" class="btn btn-primary btn-block">Iniciar sesión</v-button>
        </div>
      </v-form>
    </div>
  </div>
</template>
<script>
import VForm from './../../components/VForm'
import VInput from './../../components/VInput'
import VButton from './../../components/VButton'

import {mapActions} from 'vuex'
import authTypes from './../../store/types/auth'

export default {
  components:{
    VForm,
    VInput,
    VButton
  },
  data()
  {
    return {
      loading: false,
      user:{
        email: '',
        password: ''
      }
    }
  },
  methods:{
    ...mapActions({
      loginStore: authTypes.actions.login,
      me: authTypes.actions.me,
    }),
    async login()
    {
      this.loading = true;
      await this.loginStore(this.user)
      await this.me()
      this.loading = false;
      this.$router.push({name:'Students'});
    }
  }
}
</script>
