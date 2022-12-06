const actions = {
    async add({ commit },  data ) {
      const response = await this.$axios.$post(
        "/settings/",
        data
      );
      response.data = data;
    },
    async edit({ commit },  data ) {
      const response = await this.$axios.$put(
        `/settings/${data.id}/`,
        data
      );
      response.data = data;
    },
    async view({ commit }, ) {
        const response = await this.$axios.$get(
          "/settings/"
        );
        commit("SET_EVENT", response);
      },
  };
  
  export default actions;
  