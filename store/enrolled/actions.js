const actions = {
    async add({ commit },  data ) {
      const response = await this.$axios.$post(
        "/enrolled/",
        data
      );
      response.data = data;
    },
    async edit({ commit },  data ) {
      const response = await this.$axios.$put(
        `/enrolled/${data.id}/`,
        data
      );
      response.data = data;
    },
    async view({ commit }, data) {
        const response = await this.$axios.$post(
          "/enrolled-user/",{
            user_id: data
          }
        );
        commit("SET_EVENT", response);
      },
  };
  
  export default actions;
  