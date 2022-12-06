<template>
  <div class="pa-10">
    <v-dialog v-model="addForm" width="500">
      <add @cancel="cancelForm" @refresh="refresh" />
    </v-dialog>
    <v-dialog v-model="editForm">
      <edit
        @cancel="cancelForm"
        :selectedItem="selectedItem"
        @refresh="refresh"
      />
    </v-dialog>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <div class="text-h5">
              <b>Grading Sheet</b>
            </div>
          </v-col>
          <v-col align="end">
            <v-row>
                <v-spacer></v-spacer>
                <v-col>
                    <v-select outlined dense :items="['Final Grade','Math','Science']" class="rounded-lg"  ></v-select>
                </v-col>
              <v-col cols="auto">
                <v-btn outlined @click="addForm = true" color="primary"
                  >Print</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div>
      <v-data-table
        class="pa-5"
        :headers="headers"
        :items="subject_data"
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
              <v-list-item @click.stop="editItem(item)">
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click.stop="deleteItem(item)">
                <v-list-item-content>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
               <v-list-item @click.stop="viewGrade(item)">
                <v-list-item-content>
                  <v-list-item-title>View Grades</v-list-item-title>
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
import Add from "./Add.vue";
import Edit from "./Edit.vue";
export default {
  components: { Add, Edit },
  computed: {
    ...mapState("subject", ["subject_data"]),
    // filteredGrade(){
    //   return subject_data.filter(data=>data.quarter==localStorage.getItem('quarter'))
    // }
  },
  data() {
    return {
      isConfirmation: false,
      editForm: false,
      addForm: false,
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
      location=`/admin/final_grade?id=${item.id}`
    },
    async refresh() {
      this.addForm = false;
      this.editForm = false;
      await this.$store.dispatch("subject/view");
    },
    cancelForm() {
      this.editForm = false;
      this.addForm = false;
    },
  },
  created() {
    this.$store.dispatch("subject/view");
  },
};
</script>

<style>
</style>