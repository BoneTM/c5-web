const getters = {
  sitename: state => state.site.sitename,
  token: state => state.admin.token,
  // username: state => state.user.username,
  // nickname: state => state.user.nickname,
  // roles: state => state.user.roles,
  // vip: state => state.user.vip,
  // steam: state => state.user.steam,
  // email: state => state.user.email,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
};
export default getters;
