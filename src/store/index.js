import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false,
        reporters: [],
        reporters_loading: true,
        appReady: false
    },
    mutations: {
        changeLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn
        },
        updateReporters(state, reporters) {
            state.reporters = reporters
            state.reporters_loading = false
        },
        setAppReady(state) {
            state.appReady = true
        },
        setReportersLoading(state) {
            state.reporters_loading = true
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
        },
        setReportersLoading({commit}) {
            commit('setReportersLoading')
        }
    },
    getters: {
        getReporterById: (state) => (id) => {
            return state.reporters.find(reporters => reporters.id === id)
        }
    }
})
