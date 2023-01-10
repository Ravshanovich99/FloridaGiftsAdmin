<template>
  <div>
    <form class="titles-form" @submit.prevent="postTitles">
      <v-text-field
        v-model="title"
        :label="`Enter a title that you want to sea as a title of ${reference}`"
        class="inp-albums-title"
      >
      </v-text-field>
      <v-text-field
        v-model="subtitle"
        :label="`Enter a title that you want to sea as a subtitle of ${reference}`"
        class="inp-albums-subtitle"
      >
      </v-text-field>
      <v-btn block type="submit"> POST </v-btn>
    </form>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    reference: {
      type: String,
      default: '',
    },
    currentTitle: {
      type: String,
      default: '',
    },
    currentSubtitle: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    snackbar: false,
    text: `Successfully updated`,
  }),

  computed: {
    title: {
      get() {
        return this.currentTitle
      },

      set(value) {
        const reference = this.reference
        this.$store.commit('updateTitle', { value, reference })
      },
    },

    subtitle: {
      get() {
        return this.currentSubtitle
      },

      set(value) {
        const reference = this.reference
        this.$store.commit('updateSubtitle', { value, reference })
      },
    },
  },
  methods: {
    async postTitles() {
      if (!this.title || !this.subtitle) return
      await this.$fire.database.ref(this.reference).update({
        stateName: this.reference,
        title: this.title,
        subtitle: this.subtitle,
      })
      this.snackbar = true
    },
  },
}
</script>

<style>
</style>