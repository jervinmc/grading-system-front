const actions = {
    async add({ commit },  data ) {
      const response = await this.$axios.$post(
        "/grades/",
        data
      );
      response.data = data;
    },
    async edit({ commit },  data ) {
      const response = await this.$axios.$put(
        `/grades/${data.id}/`,
        data
      );
      response.data = data;
    },
    async view({ commit }, data) {
        const response = await this.$axios.$post(
          "/grades-subject/",
          data
        );
        commit("SET_EVENT", response);
      },
      async viewAll({ commit }, data) {
        const response = await this.$axios.$post(
          "/grades-subject-all/",
          data
        );
        commit("SET_EVENT", response);
      },
  };
  
  export default actions;
  