<template>
  <div class="container">
    <div class="form-textarea">
      <v-text-field v-model="heroTitle" class="form-textarea" label="Enter title that you want to see in hero page">
      </v-text-field>
      <v-text-field v-model="heroSubtitle" class="form-textarea"
        label="Enter subtitle that you want to see in hero page">
      </v-text-field>
    </div>
    <!-- <div class="form-image">
      <v-file-input
        v-model="image"
        class="image-inp"
        accept=".svg"
        label="Upload svg image which you wanna see in hero page"
        prepend-icon="mdi-camera"
        @change="previewImage"
      >
      </v-file-input>
      <div class="preview-image">
        <v-img class="image" :src="url"></v-img>
      </div>
    </div> -->
    <v-btn class="post-btn" block @click="postData">POST</v-btn>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'authAdmin',
  data() {
    return {
      url: null,
      image: null,
      heroTitle: '',
      heroSubtitle: '',
    }
  },

  methods: {
    async postData() {
      // const heroImageRef = this.$fire.storage.ref('/heroImage/')
      // await heroImageRef.put(this.image)
      // const imageUrl = await heroImageRef.getDownloadURL()
      const data = {
        title: this.heroTitle,
        subtitle: this.heroSubtitle,
        // image: imageUrl,
      }
      await this.$fire.database.ref('hero_page').update({ data })
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .form-textarea {
    width: 100%;

    .form-textarea {
      border-radius: 3px 3px 0 0;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
  }

  .form-image {
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @media (max-width: 600px) {}

    .v-input {
      @media (max-width: 600px) {
        flex: 0 0 0;
      }
    }

    .preview-image {
      width: 100%;
      margin: 0 auto;
      padding: 0 50px;
      box-sizing: border-box;

      .image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
