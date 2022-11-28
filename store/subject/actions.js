const actions = {
    async add({ commit },  data ) {
      const response = await this.$axios.$post(
        "/subject/",
        data
      );
      response.data = data;
    },
    async edit({ commit },  customer ) {
      console.log(customer)
      const response = await this.$axios.$put(
        `/subject/${customer.id}/`,
        customer
      );
      response.customer = customer;
    },
    async view({ commit }, ) {
        const response = await this.$axios.$get(
          `/subject/?kinder_level=${localStorage.getItem('kinder_level')}`
        );
        commit("SET_SUBJECT", response);
      },
  };
  
  export default actions;
  