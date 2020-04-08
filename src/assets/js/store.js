import Store from 'beedle'

const actions = {
  updateTitle(context, payload) {
    context.commit('setTitle', payload.text)
  },
  togglePlayAction(context, payload) {
    context.commit('togglePlay')
  },
}

const mutations = {
  setTitle(state, payload) {
    state.title = payload
    return state
  },
  togglePlay(state, payload) {
    state.play = !state.play
    return state
  },
}

const initialState = {
  title: 'My title from store.js',
  play: true,
}

// create store
export const storeInstance = new Store({
  actions,
  mutations,
  initialState,
})
