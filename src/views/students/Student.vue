<template>
  <div class="col-12 col-md-10 col-lg-6">
    <div class="text-right">
      <a @click="$router.push({name:'Students'})" class="pointer text-link">Regresar</a>
    </div>
    <h1 class="text-center my-4">Detalle del estudiante</h1>
    <div class="p-4">
      <table class="table" v-if="!loading && Object.keys(student).length>0">
        <tbody>
          <tr>
            <th>Nombres</th>
            <td>{{student.names}}</td>
          </tr>
          <tr>
            <th>Apellidos</th>
            <td>{{student.surnames}}</td>
          </tr>
          <tr>
            <th>Tipo de identificación</th>
            <td>{{student.identification_type.identification_type}}</td>
          </tr>
          <tr>
            <th>Número de identificación</th>
            <td>{{student.identification_number}}</td>
          </tr>
          <tr>
            <th>Sexo</th>
            <td>{{student.genre.genre}}</td>
          </tr>
          <tr>
            <th>Fecha de nacimiento</th>
            <td>{{student.date_of_birth | formatDate('LL')}}</td>
          </tr>
          <tr>
            <th>Carrera</th>
            <td>{{student.career.career}}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>Cargando estudiante...</div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import studentTypes from './../../store/types/students'
import {mapActions} from 'vuex'

export default {
  data()
  {
    return {
      student:{},
      loading: false
    }
  },
  filters:{
    formatDate(date,format)
    {
      moment.locale('es-do');
      return moment(date).format(format);
    }
  },
  methods:{
    ...mapActions({
      getStudentStore: studentTypes.actions.getStudent
    }),
    getStudent()
    {
      this.loading = true;
      this.getStudentStore(this.$route.params.id)
      .then(response => {
        Object.assign(this.student,response.data)
      })
      .finally(r => this.loading = false)
      
    }
  },
  mounted()
  {
    this.getStudent();
  }
}
</script>