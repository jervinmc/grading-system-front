<template>
  <div class="pa-10">
    <v-dialog v-model="isAdd" width="500">
      <v-card class="pa-5">
        <div>
          <div></div>
          <div>
            <div>Description</div>
            <v-text-field dense outlined v-model="register.description">
            </v-text-field>
          </div>
          <div>
            <div>Rate</div>
            <v-select
              dense
              outlined
              v-model="register.score"
              :items="['4', '3', '2', '1']"
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
          <v-col class="pb-5">
            <div class="text-h5">
              <b>Subject: {{ $route.query.subject }}</b>
            </div>
          </v-col>
          <v-col align="end" v-if="status != 'Final Grade'">
            <v-btn outlined @click="isAdd = true" color="primary"
              >Add Score</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div>
      <v-card class="pa-16" elevation="1" color="white">
        <v-row>
          <v-col cols="auto" class="pa-0">
            <v-btn
              color="primary"
              :text="status != 'Activity'"
              elevation="0"
              @click="status = 'Activity'"
              >Activity</v-btn
            >
          </v-col>
          <v-col cols="auto" class="pa-0" @click="status = 'Exam'">
            <v-btn color="primary" :text="status != 'Exam'">Exam</v-btn>
          </v-col>
          <v-col cols="auto" class="pa-0">
            <v-btn
              color="primary"
              :text="status != 'Final Grade'"
              @click="status = 'Final Grade'"
              >Final Grade</v-btn
            >
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <div class="pt-10">
          <!-- <v-text-field
            hide-details
            v-model="search"
            outlined
            dense
            placeholder="Search Request No."
          ></v-text-field> -->
        </div>
        <div v-if="status != 'Final Grade'">
          <v-data-table
            :search="search"
            class="pa-5"
            :headers="headers"
            :items="status == 'Activity' ? activityItem : examItem"
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

            <template #[`item.is_active`]="{ item }">
              {{ item.is_active ? "Yes" : "No" }}
            </template>
            <template #[`item.date_submitted`]="{ item }">
              {{ formatDate(item.date_submitted) }}
            </template>
            <template #[`item.opt`]="{ item }">
              <v-menu offset-y z-index="1">
                <template v-slot:activator="{ attrs, on }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item @click.stop="edit(item, '')">
                    <v-list-item-content>
                      <v-list-item-title>View</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    @click.stop="statusConfirmation(item, 'Approved')"
                    v-if="item.status == 'Pending'"
                  >
                    <v-list-item-content>
                      <v-list-item-title>Approve</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    @click.stop="statusConfirmation(item, 'Declined')"
                    v-if="item.status == 'Pending'"
                    >>
                    <v-list-item-content>
                      <v-list-item-title>Decline</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <!-- <v-list-item
                  @click.stop="status(item, 'Approved')"
                  v-if="status == 'Pending'"
                >
                  <v-list-item-content>
                    <v-list-item-title>Set as Approved</v-list-item-title>
                  </v-list-item-content>
                </v-list-item> -->

                  <v-list-item
                    @click.stop="editItem(item, 'Settled')"
                    v-if="status == 'Summon'"
                  >
                    <v-list-item-content>
                      <v-list-item-title>Settled</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    @click.stop="editItem(item, 'Dismissed')"
                    v-if="status == 'Summon'"
                  >
                    <v-list-item-content>
                      <v-list-item-title>Dismissed</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <!--<v-list-item @click.stop="activation(item, true)">
                  <v-list-item-content>
                    <v-list-item-title>Activate</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>-->
                  <!--<v-list-item @click.stop="activation(item, false)">
                  <v-list-item-content>
                    <v-list-item-title>Deactivate</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>-->
                  <!-- <v-list-item @click.stop="deleteItem(item)">
                  <v-list-item-content>
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item-content>
                </v-list-item> -->
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
          <div>
            <div align="end">Average : {{ status=='Activity' ? totalActivity.toFixed(2) :  totalExam.toFixed(2) }}</div>
          </div>
        </div>
        <v-card v-else>
          <div class="text-h5 pa-13" align="center">Final Grade</div>
          <div>
            <v-row>
              <v-col>
                <div class="pa-2">
                  Activity : {{ totalActivity.toFixed(2) }}
                </div>
                <div class="pa-2">Exam : {{ totalExam.toFixed(2) }}</div>
                <div class="px-2">Average : {{ finalGrade.toFixed(2) }}</div>
              </v-col>
            </v-row>
          </div>
        </v-card>
        <div class="py-5">
          <v-row>
            <v-col v-if="status == 'Activity'">
              Recommendation:
              <div class="green--text" v-if="totalActivity > 3">
                Mastered! X-Studentname has demonstrated exceptional performance. They are recommended to participate in enrichment programs to further improve their skills.
              </div>
               <div class="green--text" v-else-if="totalActivity > 2">
                Approaching Mastery. Student has shown competitive performance regarding curricular activities. It is advised to let them participate in extracurricular activities to display competitiveness.
              </div>
               <div class="orange--text" v-else-if="totalActivity > 1.5">
                Beginning. Struggling in studies or lack of focus. Advised to retake activities and improve study habits.
              </div>
              <div class="red--text" v-else>
                Not observed. Student has not participated in any activities. Advice to meet the parents for consultation regarding the student's performance.
              </div>
            </v-col>
            <v-col v-else-if="status == 'Exam'">
              Recommendation:
              <div class="green--text" v-if="totalExam >= 3.5">
                Mastered! X-Studentname has demonstrated exceptional performance. They are recommended to participate in enrichment programs to further improve their skills.
              </div>
               <div class="green--text" v-else-if="totalExam > 2">
                Approaching Mastery. Student has shown competitive performance regarding curricular activities. It is advised to let them participate in extracurricular activities to display competitiveness.
              </div>
               <div class="orange--text" v-else-if="totalExam > 1.5">
                Beginning. Struggling in studies or lack of focus. Advised to retake activities and improve study habits.
              </div>
              <div class="red--text" v-else>
                Not observed. Student has not participated in any activities. Advice to meet the parents for consultation regarding the student's performance.
              </div>
            </v-col>
            <v-col v-else>
              Recommendation:
               <div class="green--text" v-if="finalGrade >= 3.5">
                Mastered! X-Studentname has demonstrated exceptional performance. They are recommended to participate in enrichment programs to further improve their skills.
              </div>
               <div class="green--text" v-else-if="finalGrade >= 2.5">
                Approaching Mastery. Student has shown competitive performance regarding curricular activities. It is advised to let them participate in extracurricular activities to display competitiveness.
              </div>
               <div class="orange--text" v-else-if="finalGrade > 1.5">
                Beginning. Struggling in studies or lack of focus. Advised to retake activities and improve study habits.
              </div>
              <div class="red--text" v-else>
                Not observed. Student has not participated in any activities. Advice to meet the parents for consultation regarding the student's performance.
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
export default {
  computed: {
    ...mapState("enrolled", ["enrolled_data"]),
    ...mapState("grades", ["grade_data"]),

    totalActivity() {
      let x = 0;
      this.filteredGrade.map((data) => {
        if (data.grade_type == "Activity") {
          x = x + parseInt(data.score);
        }
      });
      let activity_data = this.filteredGrade.filter(
        (data) => data.grade_type == "Activity"
      );
      return x / activity_data.length;
    },
    filteredGrade(){
      return this.grade_data.filter(data=>data.quarter==localStorage.getItem('quarter'))
    },
    totalExam() {
      let x = 0;
      this.filteredGrade.map((data) => {
        if (data.grade_type == "Exam") {
          x = x + parseInt(data.score);
        }
      });
      let exam_data = this.filteredGrade.filter(
        (data) => data.grade_type == "Exam"
      );
      return x / exam_data.length;
    },
    activityItem() {
      return this.filteredGrade.filter((data) => data.grade_type == "Activity");
    },
    examItem() {
      return this.filteredGrade.filter((data) => data.grade_type == "Exam");
    },
    finalGrade() {
      return (this.totalActivity + this.totalExam) / 2;
    },
  },
  data() {
    return {
      status: "Activity",
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
        { text: "Description", value: "description" },
        { text: "Score", value: "score" },
        { text: "Date Submmited", value: "date_submitted" },
        { text: "Actions", value: "opt" },
        ,
      ],
    };
  },
  methods: {
    formatDate(item) {
      return moment(item).format("LL");
    },
    async submitHandler() {
      try {
        this.register.grade_type = this.status;
        this.register.quarter = localStorage.getItem('quarter')
        await this.$store.dispatch("grades/add", this.register);
        alert("Successfully Added!");
        this.isAdd = false;
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
    this.register.user_id = this.$route.query.user_id;
    this.register.subject_id = this.$route.query.subject_id;
    let x = {
      user_id: this.$route.query.user_id,
      subject_id: this.$route.query.subject_id,
    };
    this.$store.dispatch("grades/view", x);
    this.$store.dispatch("subject/view");
  },
};
</script>

<style>
</style>