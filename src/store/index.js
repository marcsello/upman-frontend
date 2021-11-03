import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false,
        reporters: []
    },
    mutations: {
        changeLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn
        },
        updateReporters(state, reporters) {
            state.reporters = reporters
        }
    },
    actions: {
        setLoggedIn({commit}) {
            commit('changeLoggedIn', true)
        },
        unsetLoggedIn({commit}) {
            commit('changeLoggedIn', false)
        },
        updateReporters({commit}, reporters) {
            commit('updateReporters', reporters)
        }
    }
})
