<template>
  <v-app>
    <h3>Welcome Florida</h3>
    <v-card class="card" max-width="500">
      <div class="users-card">
        <v-icon size="44">mdi-account</v-icon>
        <h3>{{ Object.keys(getAuthedUsers).length }}</h3>
        Authenticated users
        <v-btn v-if="!usersShow" @click="usersShow = true">Show</v-btn>
        <v-btn v-if="usersShow" @click="usersShow = false">Hide</v-btn>
      </div>
      <v-list v-if="usersShow">
        <v-list-item v-for="user of getAuthedUsers" :key="user.uid">

          <v-list-item-avatar>
            <v-img :src="user.photo"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item-content>
          <v-btn color="purple">Assign Coupon</v-btn>

        </v-list-item>
      </v-list>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      usersShow: false
    }
  },
  computed: {
    getAuthedUsers() {
      return this.$store.getters.getAuthedUsers
    },
  },

  async mounted() {
    await this.$store.dispatch('getAuthedUsersFromDb')
  },
}
</script>

<style>
.card {
  max-width: 344px;
}

@media (max-width: 576px) {
  .card {
    min-width: 100%;
  }
}

.users-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}
</style>