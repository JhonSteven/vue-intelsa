<template>
  <div class="col-12 col-md-10 py-4">
    <h1 class="text-center">Estudiantes de Universidad X</h1>
    <div class="text-right py-4 mb-4">
      <a @click="addStudent" class="btn btn-info text-white">
        <fa-icon icon="plus"/> Agregar estudiante
      </a>
    </div>
    <datatable 
      url="students"
      @delete="deleteStudent"
      @edit="editStudent"
      @show="showStudent"
      :columns="columns"/>
  </div>
</template>
<script>
import Datatable from './../../components/datatable/Datatable'
import {mapActions} from 'vuex'
import studentTypes from './../../store/types/students'

export default {
  components:{
    Datatable
  },
  methods:{
    ...mapActions({
      deleteStudentStore: studentTypes.actions.deleteStudent
    }),
    addStudent()
    {
      this.$router.push({name:'AddStudent'})
    },
    async deleteStudent(studentId)
    {
      let confirmDelete = confirm('¿Está seguro de eliminar este usuario?')
      if(confirmDelete)
      {
        await this.deleteStudentStore(studentId)
              .then(response => {
                let elem = document.querySelector('#tr-'+studentId)
                elem.parentNode.removeChild(elem)
              });
      }
    },
    editStudent(studentId)
    {
      this.$router.push({name:'EditStudent',params:{id:studentId}});
    },
    showStudent(studentId)
    {
      this.$router.push({name:'Student',params:{id:studentId}});
    },
  },
  data()
  {
    return {
      columns:[
        {
          data: 'names',
          title: 'Nombres'
        },
        {
          data: 'surnames',
          title: 'Apellidos'
        },
        {
          data: 'identification_type.identification_type',
          title: 'Tipo de ID'
        },
        {
          data: 'identification_number',
          title: 'Número de ID'
        },
        {
          data: 'genre.genre',
          title: 'Sexo'
        },
        {
          data: 'date_of_birth',
          title: 'Fecha de nacimiento'
        },
        {
          data: 'career.career',
          title: 'Carrera'
        },
        {
          data:'actions',
          title: 'Acciones',
          orderable:false,
          searchable:false,
        }
      ]
    }
  }
}
</script>