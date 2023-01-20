<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      class="navigation-menu"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt keep-alive />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-account-cowboy-hat-outline',
          title: 'Hero',
          to: '/hero',
        },
        {
          icon: 'mdi-book-open-page-variant-outline',
          title: 'Albums',
          to: '/albums',
        },
        {
          icon: 'mdi-image-outline',
          title: 'Portrets',
          to: '/portrets',
        },
        {
          icon: 'mdi-note-edit-outline',
          title: 'Notebook',
          to: '/notebooks',
        },
        {
          icon: 'mdi-lightbulb-on-outline',
          title: 'Photo-lamp',
          to: '/photolamp',
        },
      ],
      right: true,
      title: 'Florida Admin',
    }
  },
}
</script>

<style scoped>
.navigation-menu {
  max-height: calc(100%) !important;
}
</style>
