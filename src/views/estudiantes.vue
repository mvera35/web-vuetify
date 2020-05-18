<template>
  <div class="estudiantes">
    <h2 style="text-align: center">Estudiantes</h2>
    <tabla/>
  </div>
</template>

<script>
// @ is an alias to /src
import tabla from '@/components/tablaEstudiantes.vue'

export default {
  name: 'estudiantes',
  components: {
    tabla
  }
}
</script>
