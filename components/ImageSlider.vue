<template>
  <div class="slider-container">
    <v-window v-if="imagesArray !== null" v-model="onboarding" class="window">
      <v-window-item v-for="image in imagesArray" :key="image">
        <v-card class="image-card" height="150" width="250">
          <v-img
            max-height="150"
            max-width="250"
            :src="image"
            alt="album-image"
            :lazy-src="image"
          ></v-img>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions
      :class="arrowBtns ? 'justify-space-between' : 'justify-center'"
    >
      <v-btn v-if="arrowBtns" text @click="prev">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-item-group v-model="onboarding" class="text-center" mandatory>
        <v-item
          v-for="paginations in imagesArray.length"
          :key="`btn-${paginations}`"
          v-slot="{ active, toggle }"
        >
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn v-if="arrowBtns" text @click="next">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  props: {
    imagesArray: {
      type: Array,
      default: null,
    },
    arrowBtns: {
      type: Boolean,
    },
  },

  data: () => ({
    onboarding: 0,
  }),

  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.imagesArray.length
          ? 0
          : this.onboarding + 1
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0
          ? this.imagesArray.length - 1
          : this.onboarding - 1
    },
  },
}
</script>

<style scoped>
.image-card {
  margin: 0 auto;
  width: min-content;
}
</style>