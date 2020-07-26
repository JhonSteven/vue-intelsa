<template>
  <div class="col-12 col-md-10 col-lg-6">
    <div class="text-right">
      <a @click="$router.push({name:'Students'})" class="pointer text-link">Regresar</a>
    </div>
    <h1 class="text-center my-4">{{typeMethod | capitalize}} estudiante</h1>
    <div v-if="typeMethod=='editar' && !student.id">Cargando...</div>
    <v-form @submit="submit" v-if="typeMethod=='agregar' || (typeMethod=='editar' && student.id)">
      <v-input v-model="student.names" rules="required|min:4" name="names" label="Nombres"/>
      <v-input v-model="student.surnames" rules="required|min:4" name="surnames" label="Apellidos"/>
      <v-input v-model="student.identification_type_id" rules="required|numeric" type="select" :options="identificationTypeOptions" name="identification_type_id" label="Tipo de identificación"/>
      <v-input v-model="student.identification_number" rules="required|min:6" name="identification_number" label="Número de identificación"/>
      <v-input v-model="student.genre_id" rules="required|numeric" type="select" :options="genreOptions" name="genre_id" label="Sexo"/>
      <v-input v-model="student.date_of_birth" rules="required" type="date" name="date_of_birth" label="Fecha de nacimiento"/>
      <v-input v-model="student.career_id" rules="required|numeric" type="select" :options="careerOptions" name="career" label="Carrera"/>
      <v-button :loading="loading" :class="typeMethod=='agregar' ? 'btn-primary' : 'btn-info'" class="btn btn-block">{{typeMethod | capitalize}} estudiante</v-button>
    </v-form>
  </div>
</template>
<script>
import VForm from './../../components/VForm'
import VInput from './../../components/VInput'
import VButton from './../../components/VButton'
import StudentMixin from './../../mixins/StudentMixin'

export default {
  components:{
    VForm,
    VInput,
    VButton
  },
  mixins:[StudentMixin],
  data()
  {
    return {
      student:{
        id: null,
        names: '',
        surnames: '',
        identification_type_id: null,
        identification_number: '',
        genre_id: null,
        date_of_birth: '',
        career_id: null,
      }
    }
  },
  computed:{
    typeMethod()
    {
      return this.$route.name=='AddStudent' ? 'agregar' : 'editar';
    }
  },
  filters:{
    capitalize(val)
    {
      return val.charAt(0).toUpperCase() + val.slice(1);
    }
  },
  methods:{
    async submit()
    {
      let confirmAdd = confirm(`¿Está seguro de ${this.typeMethod} este estudiante?`)
      if(confirmAdd)
      {
        this.loading = true;
        if(this.typeMethod=='agregar')
        {
          await this.addStudent(this.student)
        }
        else
        {
          await this.updateStudent(this.student);
        }
        this.loading = false;
        this.$router.push({name:'Students'});
      }
    }
  },
  created()
  {
    if(this.$route.name=='AddStudent')
    {
      delete this.student.id
    }
    else
    {
      this.getStudentStore(this.$route.params.id)
      .then(response => {
        let student = response.data;

        this.student.id = student.id;
        this.student.names = student.names;
        this.student.surnames = student.surnames;
        this.student.identification_type_id = student.identification_type_id;
        this.student.identification_number = student.identification_number;
        this.student.genre_id = student.genre_id;
        this.student.date_of_birth = student.date_of_birth;
        this.student.career_id = student.career_id;
      })
    }
  }
}
</script>