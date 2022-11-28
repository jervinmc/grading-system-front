const actions = {
    async add({ commit },  data ) {
      data.status='Staff'
      const response = await this.$axios.$post(
        "/student/",
        data
      );
      response.data = data;
    },
    async edit({ commit },  customer ) {
      console.log(customer)
      const response = await this.$axios.$put(
        `/student/${customer.id}/`,
        customer
      );
      response.customer = customer;
    },
    async view({ commit }, ) {
        const response = await this.$axios.$get(
          `/student/?kinder_level=${localStorage.getItem('kinder_level')}`
        );
        commit("SET_DATA", response);
      },
      async delete({ commit },  customer ) {
        console.log(customer)
        const response = await this.$axios.$put(
          `/student/${customer.id}/`,
          customer
        );
        response.customer = customer;
      },
  };
  
  export default actions;
  