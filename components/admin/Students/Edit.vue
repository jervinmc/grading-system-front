<template>
  <div>
    <v-card>
      <div class="px-0">
        <v-form
          v-model="isValid"
          ref="form"
          lazy-validation
          @submit.prevent="submitHandler"
        >
          <div align="start" class="py-0">
            <div align="start" class="py-5 px-5 white--text text-h6 primary">
              Edit Account
            </div>
            <div class="pa-10">
              <div>
                <v-row>
                  <v-col>
                    First Name
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.firstname"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    Middle Name
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.middlename"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    Last Name
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.lastname"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    Suffix
                    <v-text-field
                      outlined
                      dense
                      v-model="register.suffix"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col>
                    Birthday
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.birthdate"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    Phone Number
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.mobile_number"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col>
                    Username
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.username"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    Email Address
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.email"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div>
                <!-- <v-row>
                  <v-col>
                    Password
                    <v-text-field
                      outlined
                      :rules="standardRules"
                      v-model="register.password"
                    ></v-text-field>
                  </v-col>
                </v-row> -->
              </div>
              <div>
                <v-row>
                  <v-col>
                    House No./Street
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.street"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    Purok
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.purok"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    Barangay
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.barangay"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col>
                    Educational Attainment
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.educational_attainment"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    Gender
                    <v-select
                      :items="['Male', 'Female']"
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.gender"
                    ></v-select>
                  </v-col>
                  <v-col>
                    Blood Type
                    <v-select
                      outlined
                      dense
                      :items="[
                        'O+',
                        'O-',
                        'A+',
                        'A-',
                        'B+',
                        'B-',
                        'AB+',
                        'AB-',
                      ]"
                      :rules="standardRules"
                      v-model="register.blood_type"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col>
                    Condition Status
                    <v-select
                      :items="['None','Senior Citizen', 'PWD']"
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.condition_status"
                    ></v-select>
                  </v-col>
                  <v-col>
                    Occupation
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.occupation"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    Religion
                    <v-text-field
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.religion"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    House Ownership Status
                    <v-select
                      :items="['Owned','Rent', 'Living with Parents']"
                      outlined
                      dense
                      :rules="standardRules"
                      v-model="register.gender"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>
              <div class="px-10 pointer" align="center">
                <v-btn
                  width="200"
                  dark
                  depressed
                  color="grey"
                  @click="cancelForm"
                >
                  Cancel
                </v-btn>
                <v-btn
                  width="200"
                  :loading="isLoaded"
                  dark
                  depressed
                  color="primary"
                  type="submit"
                >
                  Save Changes
                </v-btn>
              </div>
            </div>
          </div>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
import validations from "@/utils/validations";
import VueToastr from "vue-toastr";
import Vue from 'vue';
Vue.use(VueToastr, {
  /* OverWrite Plugin Options if you need */
});
var cloneDeep = require("lodash.clonedeep");
export default {
  props: ["selectedItem"],

  data() {
    return {
      isLoaded: false,
      register: {
        firstname: "",
        middlename:"",
        lastname: "",
        gender: "",
        email: "",
        confirm_email: "",
        mobile_number: "",
        birthdate: "",
        address: "",
        street: "",
        purok: "",
        barangay: "",
        // password: "",
        // confirm_password: "",
      },
      ...validations,
      isValid: false,
    };
  },
  created() {
   
    this.register.firstname = cloneDeep(this.selectedItem.firstname);
    this.register.lastname = cloneDeep(this.selectedItem.lastname);
    this.register.middlename = cloneDeep(this.selectedItem.middlename);
    this.register.birthdate = cloneDeep(this.selectedItem.birthdate);
    this.register.mobile_number = cloneDeep(this.selectedItem.mobile_number);
    this.register.email = cloneDeep(this.selectedItem.email);
    this.register.educational_attainment = cloneDeep(
      this.selectedItem.educational_attainment
    );
    this.register.gender = cloneDeep(this.selectedItem.gender);
    this.register.blood_type = cloneDeep(this.selectedItem.blood_type);
    this.register.condition_status = cloneDeep(
      this.selectedItem.condition_status
    );
    this.register.occupation = cloneDeep(this.selectedItem.occupation);
    this.register.religion = cloneDeep(this.selectedItem.religion);
    this.register.house_status = cloneDeep(this.selectedItem.house_status);
    this.register.id = cloneDeep(this.selectedItem.id);
    this.register.street = cloneDeep(this.selectedItem.street);
    this.register.purok = cloneDeep(this.selectedItem.purok);
    this.register.username = cloneDeep(this.selectedItem.username);
    this.register.barangay = cloneDeep(this.selectedItem.barangay);
  },
  methods: {
    cancelForm() {
       this.$refs.form.reset()
      this.$emit("cancel");
    },
    async submitHandler() {
      this.isLoaded = true;
      this.$refs.form.validate();
      if (!this.isValid) return;
      console.log(this.register);
      try {
        await this.$store.dispatch("users/editUser", this.register);
        this.$toastr.s("SUCCESS MESSAGE", "Successfully Added!");
        this.$emit("refresh");
        this.cancelForm()
   
      } catch (error) {
        alert(error);
      }
      this.isLoaded = false;
    },
  },
};
</script>

<style>
</style>