/* eslint-disable no-console */

export const state = () => ({
  albums: [],
  portrets: [],
  glasses: []

})

export const mutations = {
  setState(state, { data, reference }) {
    for (const dbId in data.cards) {
      data.cards[dbId].dbId = dbId // to delete exact card by its id of database
    }
    state[reference] = data
    // console.log('setCards', state);
  },

  deleteCardById(state, { cardDbRef, reference }) {
    // console.log('deleteCard', cardDbRef);
    delete state[reference].cards[cardDbRef]
  },

  updateTitle(state, { value, reference }) {
    state[reference].title = value
  },

  updateSubtitle(state, { value, reference }) {
    state[reference].subtitle = value
  }
}

export const getters = {
  getStateByReference: (state) => (reference) => {
    // console.log('getters cards', state[reference]);
    return state[reference]
  }
}

export const actions = {
  async deleteCard({ commit, dispatch }, { cardMediaRef, cardDbRef, reference }) {
    // console.log('async deleteCard', reference);
    try {
      await this.$fire.database.ref(`${reference}/cards/`).child(cardDbRef).remove()
      await this.$fire.storage
        .ref(`${reference}_cards`)
        .child(cardMediaRef)
        .listAll()
        .then((value) =>
          value.items.forEach(async (elem) => {
            await this.$fire.storage.ref(elem.fullPath).delete()
          })
        )
      commit('deleteCardById', { cardDbRef, reference })
    } catch (error) {
      console.log(error);
    }
  },

  async getStateByReferenceFromDb({ dispatch, commit, getters }, reference) {
    try {
      const response = await this.$fire.database.ref(reference)
      const { data } = await this.$axios.get(response.toString() + '.json')
      await commit('setState', { data, reference })
    } catch (error) {
      console.log(error)
    }
  }
}
