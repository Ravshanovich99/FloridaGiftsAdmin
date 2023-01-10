<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <v-app class="page-container">
    <TitlesForm
      :reference="reference"
      :currentTitle="state.title"
      :currentSubtitle="state.subtitle"
    />
    <ModalsComponent
      v-if="newCardModalOpen"
      :addCardModal="true"
      :reference="reference"
      @onCloseModal="onCloseNewCardModal"
    />

    <div class="cards-container">
      <v-card class="add-card-btn">
        <v-btn
          class="mx-2"
          fab
          dark
          large
          @click=";(deleteModalOpen = false), (newCardModalOpen = true)"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-card>
      <CardComponent
        v-for="card of state.cards"
        :key="card.urlsId"
        :cardImages="card.images"
        :cardTitle="card.title"
        :cardDescription="card.description"
        :cardMediaRef="card.urlsId"
        :cardDbRef="card.dbId"
        :deleteBtn="true"
        :imagesWithSlider="true"
        @onOpenDeleteModal="getPropsDeletingCard"
      />

      <ModalsComponent
        v-if="deleteModalOpen"
        :deleteModal="true"
        :deletingCard="deletingCard"
        :reference="reference"
        @onCloseModal="onCloseDeleteModal"
      />
    </div>
    <!-- SnackBar  -->
  </v-app>
</template>

<script>
export default {
  /* eslint-disable no-console */

  props: {
    reference: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      newCardModalOpen: false,
      deleteModalOpen: false,
      deletingCard: {},
    }
  },

  computed: {
    state() {
      if (!this.$store.state[this.reference]) return
      // console.log('pageWithCards computed run')
      return this.$store.getters.getStateByReference(this.reference)
    },
  },

  async mounted() {
    await this.$store.dispatch('getStateByReferenceFromDb', this.reference)
  },

  methods: {
    getPropsDeletingCard(deletingCardObject) {
      this.newCardModalOpen = false
      this.deleteModalOpen = true
      this.deletingCard = deletingCardObject
    },
    onCloseNewCardModal() {
      this.newCardModalOpen = false
    },
    onCloseDeleteModal() {
      this.deleteModalOpen = false
    },
  },
}
</script>


<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 40px 20px;
    .add-card-btn {
      width: 24%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;

      @media (max-width: 767px) {
        width: 49%;
      }
      @media (max-width: 321px) {
        width: 80%;
      }
    }
  }
}
</style>