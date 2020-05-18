<template>
<div>
  <v-container>
    <v-btn
    @click="altaEstudiante=!altaEstudiante">
      Agregar Alumno
    </v-btn>
    <v-card v-if="altaEstudiante" class="mx-auto" max-width="344" :elevation="20">
      <v-card-text>
        <div >
          <v-text-field v-model="auxEditar.matricula" label="Matrícula"></v-text-field>
          <v-text-field v-model="auxEditar.aPaterno" label="Apellido Paterno"></v-text-field>
          <v-text-field v-model="auxEditar.aMaterno" label="Apellido Materno"></v-text-field>
          <v-text-field v-model="auxEditar.nombre" label="Nombre"></v-text-field>
          <v-text-field v-model="auxEditar.semestreIngreso" label="Semestre Ingreso"></v-text-field>
          <v-text-field v-model="auxEditar.creditosCursados" label="Creditos Cursados"></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text
              @click="agregarAlumno()">Guardar</v-btn>
              <v-btn color="blue darken-1" text
              @click="altaEstudiante=!altaEstudiante, reiniciar()">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="altaInscribir" class="mx-auto" max-width="344" :elevation="20">
      <v-card-text>
        <div>
          <v-text-field v-model="clave" label="Clave del curso"></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text
              @click="inscribirAlumno()">Guardar</v-btn>
              <v-btn color="blue darken-1" text
              @click="altaInscribir=!altaInscribir, reiniciar()">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
    <v-data-table
    :headers="encabezado"
    :items="estudiantes"
    show-expand
    >
    <template v-slot:expanded-item="{ headers, item }">
     <td :colspan="headers.length">
       <v-btn icon title="Inscribir a un curso"
       @click="altaInscribir=!altaInscribir, auxEditar.matricula=item.matricula">
         <v-icon>mdi-plus-circle-outline</v-icon>
       </v-btn>
       <template v-if="item.cursos.length > 0">
         <p v-for="curso in item.cursos"
         :key="curso.clave">
          <v-btn icon title="Dar baja curso"
          @click="darBajaCurso(item.matricula, curso.clave)">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
          {{curso.nombre}}
         </p>
       </template>
       <template v-else>
         <v-btn icon title="Dar de baja al estudiante"
         @click="eliminar(item.matricula)">
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
  name: 'tablaEstudiantes',

  data () {
    return {
      estudiantes: [],
      clave: 0,
      default: {
        matricula: 0,
        aPaterno: ' ',
        aMaterno: ' ',
        nombre: ' ',
        creditosCursados: 0,
        semestreIngreso: 0
      },
      auxEditar: {
        matricula: 0,
        aPaterno: ' ',
        aMaterno: ' ',
        nombre: ' ',
        creditosCursados: 0,
        semestreIngreso: 0
      },
      altaEstudiante: false,
      altaInscribir: false,
      encabezado: [{
        text: 'Matricula',
        align: 'start',
        sortable: false,
        value: 'matricula'
      },
      {
        text: 'Apellido Paterno',
        value: 'aPaterno'
      },
      {
        text: 'Apellido Materno',
        value: 'aMaterno'
      },
      {
        text: 'Nombre',
        value: 'nombre'
      },
      {
        text: 'Semestre Ingreso',
        value: 'semestreIngreso'
      },
      {
        text: 'Creditos Cursados',
        value: 'creditosCursados'
      }
      ]
    }
  },
  methods: {
    almacenarDatos: function (datos, relacion) {
      datos.forEach(item => {
        item.cursos = []
        relacion.forEach(curso => {
          fetch(`http://localhost:4000/cursos/${curso.clave}/lista`)
            .then(response => {
              return response.json()
            })
            .then(rel => {
              rel.forEach(r => {
                if (r.matricula_estudiante === item.matricula) {
                  fetch(`http://localhost:4000/cursos/${r.clave_curso}`)
                    .then(res => {
                      return res.json()
                    })
                    .then(cur => {
                      item.cursos.push(cur)
                    })
                }
              })
            })
        })
      })
      this.estudiantes = datos
    },
    actualizar: function () {
      location.reload()
    },
    reiniciar: function () {
      this.auxEditar = this.default
      this.clave = 0
    },
    eliminar: function (id) {
      fetch(`http://localhost:4000/estudiantes/${id}`, {
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
    inscribirAlumno: function () {
      fetch(`http://localhost:4000/estudiantes/${this.auxEditar.matricula}/inscribir/${this.clave}`, {
        method: 'POST'
      })
        .then(response => { return response.text() })
        .then(res => { console.log(res) })
        .catch(error => { console.log(error) })
      this.actualizar()
      this.reiniciar()
    },
    darBajaCurso: function (matricula, clave) {
      fetch(`http://localhost:4000/estudiantes/${matricula}/inscribir/${clave}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => { return response.text() })
        .then(res => { console.log(res) })
        .catch(error => { console.log(error) })
      this.reiniciar()
      this.actualizar()
    },
    agregarAlumno: function () {
      fetch('http://localhost:4000/estudiantes', {
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
    fetch('http://localhost:4000/estudiantes')
      .then(response => {
        return response.json()
      })
      .then(estudiantes => {
        fetch('http://localhost:4000/cursos')
          .then(respuesta => {
            return respuesta.json()
          })
          .then(cursos => {
            this.almacenarDatos(estudiantes, cursos)
          })
      })
  }
}
</script>
