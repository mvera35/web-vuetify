<template>
  <div>
    <v-container>
      <v-btn
      @click="altaCurso=!altaCurso">
        Agregar Curso
      </v-btn>
      <v-card v-if="altaCurso" class="mx-auto" max-width="344" :elevation="20">
        <v-card-text>
          <div >
            <v-text-field v-model="auxEditar.clave" label="Clave"></v-text-field>
            <v-text-field v-model="auxEditar.nombre" label="Nombre"></v-text-field>
            <v-text-field v-model="auxEditar.creditos" label="Creditos"></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                @click="agregarCurso()">Guardar</v-btn>
                <v-btn color="blue darken-1" text
                @click="altaCurso=!altaCurso, reiniciar()">Cancelar</v-btn>
              </v-card-actions>
      </v-card>
      <v-data-table
      :headers="encabezado"
      :items="cursos"
      show-expand>

      <template v-slot:expanded-item="{ headers, item }">
       <td :colspan="headers.length">
         <template v-if="item.estudiantes.length > 0">
           <p v-for="estudiante in item.estudiantes"
           :key="estudiante.matricula">
            {{estudiante.matricula}}
           </p>
         </template>
         <template v-else>
           <v-btn icon title="Dar de baja curso"
           @click="eliminar(item.clave)">
             <v-icon>mdi-close-circle</v-icon>
           </v-btn>
         </template>
       </td>
      </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'tablaCursos',
  data () {
    return {
      cursos: [],
      altaCurso: false,
      default: {
        clave: 0,
        nombre: '',
        creditos: 0
      },
      auxEditar: {
        clave: 0,
        nombre: '',
        creditos: 0
      },
      encabezado: [{
        text: 'Clave',
        align: 'start',
        sortable: false,
        value: 'clave'
      },
      {
        text: 'Nombre',
        value: 'nombre'
      },
      {
        text: 'Creditos',
        value: 'creditos'
      }
      ]
    }
  },
  methods: {
    almacenarCursos: function (datos) {
      datos.forEach(item => {
        item.estudiantes = []
        fetch(`http://localhost:4000/cursos/${item.clave}/lista`)
          .then(response => {
            return response.json()
          })
          .then(relacion => {
            relacion.forEach(r => {
              fetch(`http://localhost:4000/estudiantes/${r.matricula_estudiante}`)
                .then(estudiantes => {
                  return estudiantes.json()
                })
                .then(estud => {
                  item.estudiantes.push(estud)
                })
            })
          })
      })
      this.cursos = datos
    },
    actualizar: function () {
      location.reload()
    },
    reiniciar: function () {
      this.auxEditar = this.default
    },
    eliminar: function (id) {
      fetch(`http://localhost:4000/cursos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => { return response.text() })
        .then(res => { console.log(res) })
        .catch(error => { console.log(error) })
      this.actualizar()
    },
    agregarCurso: function () {
      fetch('http://localhost:4000/cursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.auxEditar)
      })
        .then(response => {
          return response.text()
        })
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
      this.reiniciar()
      this.actualizar()
    }
  },
  mounted () {
    fetch('http://localhost:4000/cursos')
      .then(response => {
        return response.json()
      })
      .then(datos => {
        this.almacenarCursos(datos)
      })
  }
}
</script>
