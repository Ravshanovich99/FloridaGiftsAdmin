<template>
  <div class="container">
    <v-card shaped outlined class="login-card">
      <h2>Log In</h2>
      <v-form class="login-form" @submit.prevent="submitHandler">
        <v-text-field
          v-model="email"
          label="Enter your email"
          :rules="rules"
          hide-details="auto"
          class="input-field"
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          label="Enter your password"
          :rules="rules"
          hide-details="auto"
          class="input-field"
        >
        </v-text-field>
        <v-btn class="sub-btn" type="submit">Login</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      email: '',
      password: '',
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length >= 6) || 'Min 6 characters',
      ],
    }
  },

  computed: {
    getError() {
      return this.$store.getters.error
    },
  },

  methods: {
    async submitHandler() {
      if (!this.email || !this.password) {
        return false
      } else {
        const formData = {
          email: this.email,
          password: this.password,
        }
        try {
          await this.$store.dispatch('auth/login', formData)
          this.$router.push('/')
        } catch (error) {}
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-card {
    width: 70%;
    height: 60%;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      width: 100%;
      height: 100%;
    }

    .input-field,
    .sub-btn {
      flex: 0 0 0;
      width: 70%;
    }

    .sub-btn {
      padding: 20px;
    }
  }
}
</style>