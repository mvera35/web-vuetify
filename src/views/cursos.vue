<template>
  <div class="Cursos">
    <h2 style="text-align: center">Cursos</h2>
    <tabla/>
  </div>
</template>

<script>
// @ is an alias to /src
import tabla from '@/components/tablaCursos.vue'

export default {
  name: 'cursos',
  components: {
    tabla
  }
}
</script>
