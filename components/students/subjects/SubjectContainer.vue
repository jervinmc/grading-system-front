<template>
  <div class="pa-10">
    <v-dialog v-model="isAdd" width="500">
      <v-card class="pa-5">
        <div>
          <div></div>
          <div>
            <div>Subject Name</div>
            <v-select
              dense
              outlined
              v-model="register.subject_id"
              :items="subject_data"
              item-text="subject_name"
              item-value="id"
            >
            </v-select>
          </div>
          <v-row>
            <v-col align="end">
              <div align="end">
                <v-btn @click="isAdd = false" dark color="grey">Cancel</v-btn>
              </div>
            </v-col>
            <v-col>
              <div align="start">
                <v-btn @click="submitHandler" color="primary">Submit</v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <div class="text-h5">
              <b>Enrolled Subject</b>
            </div>
          </v-col>
          <v-col align="end">
            <v-btn outlined @click="isAdd = true" color="primary"
              >Add Subject</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div>
      <v-data-table
        class="pa-5"
        :headers="headers"
        :items="enrolled_data"
        :search="search"
        :loading="isLoading"
      >
        <template v-slot:loading>
          <v-skeleton-loader
            v-for="n in 5"
            :key="n"
            type="list-item-avatar-two-line"
            class="my-2"
          ></v-skeleton-loader>
        </template>
        <template #[`item.opt`]="{ item }">
          <v-menu offset-y z-index="1">
            <template v-slot:activator="{ attrs, on }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <!-- <v-list-item @click.stop="editItem(item)">
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->
              <!-- <v-list-item @click.stop="deleteItem(item)">
                <v-list-item-content>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->
              <v-list-item @click.stop="viewGrade(item)">
                <v-list-item-content>
                  <v-list-item-title>View Grade</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("enrolled", ["enrolled_data"]),
    ...mapState("subject", ["subject_data"]),
  },
  data() {
    return {
      register: {
        user_id: this.$route.query.id,
      },
      isConfirmation: false,
      editForm: false,
      addForm: false,
      isAdd: false,
      items: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Subject Name", value: "subject_name" },
        { text: "Actions", value: "opt" },
        ,
      ],
    };
  },
  methods: {
    viewGrade(item){
        location=`/students/grades?subject_id=${item.subject_id}&&user_id=${item.user_id}`
    },
    async submitHandler() {
      try {
        await this.$store.dispatch("enrolled/add", this.register);
        alert("Successfully Added!");
        this.isAdd = false;
        this.$store.dispatch("enrolled/view",this.$route.query.id);
      } catch (error) {
        alert("Error");
      }
    },
    viewSubject(item) {
      location = `/studets/subjects?id=${item.id}`;
    },
    cancelForm() {
      this.editForm = false;
      this.addForm = false;
    },
  },
  created() {
    this.$store.dispatch("enrolled/view",this.$route.query.id);
    this.$store.dispatch("subject/view");
  },
};
</script>

<style>
</style>