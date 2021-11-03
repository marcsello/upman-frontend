import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false,
        reporters: [],
        appReady: false
    },
    mutations: {
        changeLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn
        },
        updateReporters(state, reporters) {
            state.reporters = reporters
        },
        setAppReady(state) {
            state.appReady = true
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
        },
        setAppReady({commit}) {
            commit('setAppReady')
        }
    }
})
