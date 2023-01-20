<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <v-card class="modal" :loading="newCard.loading ? true : false">
    <v-card class="modal-header">
      <h3 v-if="addCardModal" class="header-title">New card</h3>
      <h3 v-if="deleteModal" class="header-title">Delete</h3>
      <v-icon aria-hidden="false" width="100%" @click="$emit('onCloseModal')"
        >mdi-close</v-icon
      >
    </v-card>

    <!-- Delete Modal  -->
    <div v-if="deleteModal" class="modal-delete">
      <h3>
        Are you really want to delete this card {{ deletingCard.cardTitle }}?
      </h3>
      <div class="modal-delete-btns">
        <v-btn @click="$emit('onCloseModal')">Cancel</v-btn>
        <v-btn color="error" @click="deleteCard">Delete</v-btn>
      </div>
    </div>

    <!-- Add New Card Modal  -->
    <form
      v-if="addCardModal"
      class="modal-container"
      @submit.prevent="postNewCardToDb"
    >
      <v-file-input
        v-model="newCard.cardImages"
        :clearable="false"
        prepend-icon="mdi-image-multiple"
        multiple
        show-size
        label="Upload card images"
        @change="previewImage"
      >
      </v-file-input>
      <v-file-input
        v-model="newCard.cardVideo"
        :clearable="false"
        prepend-icon="mdi-youtube"
        show-size
        label="Upload video"
      >
      </v-file-input>
      <div v-if="newCard.cardImageUrls.length !== 0" class="preview-image">
        <ImageSlider :imagesArray="newCard.cardImageUrls" :arrowBtns="true" />
      </div>
      <v-text-field
        v-model="newCard.cardTitle"
        label="Enter card title"
      ></v-text-field>
      <v-text-field
        v-model="newCard.cardSnippet"
        label="Enter card description"
      ></v-text-field>
      <div class="item-details-container">
        <div class="item-details">
          <div class="item-sizes">
            <v-text-field
              v-model="newCard.size1.width"
              type="number"
              class="item-size"
              placeholder="size"
            ></v-text-field>
            <p>x</p>
            <v-text-field
              v-model="newCard.size1.height"
              type="number"
              class="item-size"
              placeholder="size"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="newCard.size1.price"
            type="number"
            class="item-price"
            placeholder="price"
          ></v-text-field>
        </div>
        <div class="item-details">
          <div class="item-sizes">
            <v-text-field
              v-model="newCard.size2.width"
              type="number"
              class="item-size"
              placeholder="size"
            ></v-text-field>
            <p>x</p>
            <v-text-field
              v-model="newCard.size2.height"
              type="number"
              class="item-size"
              placeholder="size"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="newCard.size2.price"
            type="number"
            class="item-price"
            placeholder="price"
          ></v-text-field>
        </div>
        <div class="item-details">
          <div class="item-sizes">
            <v-text-field
              v-model="newCard.size3.width"
              type="number"
              class="item-size"
              placeholder="size"
            ></v-text-field>
            <p>x</p>
            <v-text-field
              v-model="newCard.size3.height"
              type="number"
              class="item-size"
              placeholder="size"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="newCard.size3.price"
            type="number"
            class="item-price"
            placeholder="price"
          ></v-text-field>
        </div>
        <div class="item-details">
          <div class="item-sizes">
            <v-text-field
              v-model="newCard.size4.width"
              type="number"
              class="item-size"
              placeholder="size"
            ></v-text-field>
            <p>x</p>
            <v-text-field
              v-model="newCard.size4.height"
              type="number"
              class="item-size"
              placeholder="size"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="newCard.size4.price"
            type="number"
            class="item-price"
            placeholder="price"
          ></v-text-field>
        </div>
        <div class="item-details">
          <div class="item-sizes">
            <v-text-field
              v-model="newCard.size5.width"
              type="number"
              class="item-size"
              placeholder="size"
            ></v-text-field>
            <p>x</p>
            <v-text-field
              v-model="newCard.size5.height"
              type="number"
              class="item-size"
              placeholder="size"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="newCard.size5.price"
            type="number"
            class="item-price"
            placeholder="price"
          ></v-text-field>
        </div>
      </div>
      <div class="card-checkboxes">
        <v-checkbox
          v-model="newCard.includeBests"
          label="include to bests"
        ></v-checkbox>
        <v-checkbox
          v-model="newCard.includePopulars"
          label="include to populars"
        ></v-checkbox>
      </div>
      <v-btn type="submit" :loading="newCard.loading ? true : false" block
        >POST</v-btn
      >
    </form>
  </v-card>
</template>

<script>
import { v4 as uuidV4, v1 as uuidV1 } from 'uuid'

export default {
  /* eslint-disable no-console */
  props: {
    reference: {
      type: String,
      required: true,
    },
    addCardModal: {
      type: Boolean,
    },
    deleteModal: {
      type: Boolean,
    },
    deletingCard: {
      type: Object,
      default: null,
    },
  },
  emits: ['onCloseDeleteModal', 'onCloseModal'],
  data() {
    return {
      newCard: {
        loading: false,
        cardImages: [],
        cardVideo: null,
        cardImageUrls: [],
        cardTitle: '',
        cardSnippet: '',
        includeBests: false,
        includePopulars: false,
        size1: {
          width: '',
          height: '',
          price: '',
        },
        size2: {
          width: '',
          height: '',
          price: '',
        },
        size3: {
          width: '',
          height: '',
          price: '',
        },
        size4: {
          width: '',
          height: '',
          price: '',
        },
        size5: {
          width: '',
          height: '',
          price: '',
        },
      },
    }
  },
  computed: {
    newCardValidate() {
      if (
        this.newCard.cardImages.length > 0 &&
        this.newCard.cardTitle &&
        this.newCard.cardSnippet &&
        this.newCard.size1.width &&
        this.newCard.size1.height &&
        this.newCard.size1.price
      ) {
        return true
      }
      return false
    },
  },
  methods: {
    previewImage($event) {
      for (const image of event.target.files) {
        this.newCard.cardImageUrls.push(URL.createObjectURL(image))
      }
    },

    async deleteCard() {
      const payload = {
        cardDbRef: this.deletingCard.cardDbRef,
        cardMediaRef: this.deletingCard.cardMediaRef,
        reference: this.reference,
      }
      await this.$store.dispatch('deleteCard', payload)
      this.$emit('onCloseModal')
    },

    async getMediaUrlsFromStorage(newCardData) {
      const cardMediaRef = uuidV1()
      const cardImagesRef = await this.$fire.storage
        .ref(`/${this.reference}_cards/`)
        .child(cardMediaRef)
      const videoRef = await cardImagesRef.child(uuidV4())
      if (this.newCard.cardVideo) {
        await videoRef.put(this.newCard.cardVideo)
        const videoUrl = await videoRef.getDownloadURL()
        newCardData.video = videoUrl
      }
      newCardData.urlsId = cardMediaRef
      const promiseArr = this.newCard.cardImages.map(async (image) => {
        const imageRef = cardImagesRef.child(uuidV4())
        await imageRef.put(image)
        const imageUrl = await imageRef.getDownloadURL()
        newCardData.images.push(imageUrl)
      })
      await Promise.all(promiseArr)
    },

    async postNewCardToDb() {
      if (this.newCardValidate) {
        try {
          this.newCard.loading = true

          const newCardData = {
            stateName: this.reference,
            urlsId: '',
            title: this.newCard.cardTitle,
            description: this.newCard.cardSnippet,
            video: '',
            images: [],
            prices: {
              size1: this.newCard.size1.width && this.newCard.size1,
              size2: this.newCard.size2.width && this.newCard.size2,
              size3: this.newCard.size3.width && this.newCard.size3,
              size4: this.newCard.size4.width && this.newCard.size4,
              size5: this.newCard.size5.width && this.newCard.size5,
            },
            bests: this.newCard.includeBests,
            populars: this.newCard.includePopulars,
          }

          await this.getMediaUrlsFromStorage(newCardData)

          await this.$fire.database
            .ref(`${this.reference}/cards`)
            .push(newCardData)
          // console.log(newCardData)
          await this.$store.dispatch(
            'getStateByReferenceFromDb',
            this.reference
          )
          this.$emit('onCloseModal')
        } catch (error) {
          console.log(error)
        }
      } else {
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  width: 70%;
  background: black;
  position: absolute;
  z-index: 99;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  border-radius: 5px;
  transition: 0.5s;

  @media (max-width: 767px) {
    transform: translate(50%, -25%);
    width: 100%;
    position: relative;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px 5px 0 0;
  }

  &-delete {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-btns {
      padding-top: 40px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }

  &-container {
    padding: 20px;

    .preview-image {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .item-details-container {
    display: flex;
    flex-direction: column;
    .item-details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .item-sizes {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 30%;

        p {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item-size {
          flex: 0 0 40%;
        }
      }

      .item-price {
        flex: 0 0 50%;
      }
    }
  }

  .card-checkboxes {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>