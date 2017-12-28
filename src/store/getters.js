const getters = {
  clientWidth: state => state.app.clientWidth,
  clientHeight: state => state.app.clientHeight,
  mainWidth: state => 0,
  mainHeight: state => state.app.clientHeight - 86,
  tableHeight: state => state.app.clientHeight - 86 - 84,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles
}
export default getters
