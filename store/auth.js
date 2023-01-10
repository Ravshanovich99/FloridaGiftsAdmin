export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(email, password)
      }
      catch (e) {
        console.log(e);
      }
    },
  }
}