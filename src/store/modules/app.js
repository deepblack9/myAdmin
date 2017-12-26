import Cookies from 'js-cookie'

const app = {
  state: {
    clientWidth: 0,
    clientHeight: 0,
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: {
    updateClientSize: ({ commit, state }, size) => {
      state.clientWidth = size.clientWidth
      state.clientHeight = size.clientHeight
    },
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
