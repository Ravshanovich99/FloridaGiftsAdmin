<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div class="cards">
    <v-card class="card-container">
      <div class="delete-btn">
        <v-btn
          v-if="deleteBtn"
          class="mx-2"
          fab
          dark
          small
          @click="onOpenDeleteModal({ cardTitle, cardDbRef, cardMediaRef })"
        >
          <v-icon dark> mdi-delete </v-icon>
        </v-btn>
      </div>
      <ImageSlider
        v-if="imagesWithSlider"
        :imagesArray="cardImages"
        :arrowBtns="false"
      />
      <v-img v-else></v-img>
      <div class="text-container">
        <h3 class="card-title">{{ cardTitle }}</h3>
        <p class="card-description">{{ cardDescription }}</p>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    cardImages: {
      type: Array,
      default: null,
    },
    cardTitle: {
      type: String,
      default: 'Title',
    },
    cardDescription: {
      type: String,
      default: 'Description',
    },
    deleteBtn: {
      type: Boolean,
    },
    imagesWithSlider: {
      type: Boolean,
    },
    cardMediaRef: {
      type: String,
      default: '',
    },
    cardDbRef: {
      type: String,
      default: '',
    },
    deleteModalOpen: {
      type: Boolean,
    },
  },
  emits: ['onOpenDeleteModal', 'onCloseDeleteModal'],

  methods: {
    onOpenDeleteModal(deletingCardObject) {
      this.$emit('onOpenDeleteModal', deletingCardObject)
    },
  },
}
</script>

<style lang="scss" scoped>
.cards {
  width: 24%;
  margin: 0 auto;

  @media (max-width: 767px) {
    width: 48%;
  }
  @media (max-width: 321px) {
    width: 80%;
  }
  .card-container {
    width: 100%;
    position: relative;
    margin: 10px 0;

    .delete-btn {
      position: absolute !important;
      z-index: 2;
      right: -1rem;
      top: -1rem;
      transform: scale(0);
      transition: 0.3s;
    }
    &:hover .delete-btn {
      transform: scale(1);
    }

    .text-container {
      display: flex;
      flex-direction: column;
      padding: 0 10px;
    }
  }
}
</style>