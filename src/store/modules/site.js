import { getSiteInfo } from "../../api/site";

const getDefaultState = () => {
  return {
    sitename: '',
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_SITENAME: (state, sitename) => {
    state.sitename = sitename;
  },
};

const actions = {
  getSiteInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getSiteInfo()
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject('Verification failed, please Login again.');
          }

          commit('SET_SITENAME', data.siteName);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
