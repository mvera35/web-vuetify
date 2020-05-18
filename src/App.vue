<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-btn icon @click="menu=!menu">
        <v-icon>mdi-view-headline</v-icon>
      </v-btn>
      <div class="d-flex align-center">
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-title>Java Script para Clientes y Servidores</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app v-model="menu" color="primary">
      <v-list dense nav>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-school</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <v-tab to="/estudiantes">
                Estudiantes
              </v-tab>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-chair-school</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <v-tab to="/cursos">
                Cursos
              </v-tab>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view>
      </router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },
  data () {
    return {
      menu: false
    }
  }
}
</script>
