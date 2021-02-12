<template>
  <div >
    <v-flex sm8 offset-sm2>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>Edit Student</v-toolbar-title>
        </v-toolbar>

        <v-progress-circular v-if="!$store.getters.isLoaded" color="purple"/>
        
        <v-form v-if="$store.getters.isLoaded">
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field v-model="student.firstName" label="fName" required></v-text-field>
                <v-text-field v-model="student.lastName" label="lName" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn @click="submit">submit</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    <br>
    <Students/>
  </div>
</template>

<script>
import axios from "axios";
import Students from "./Students";

export default {
  data() {
    return {
    };
  },
  computed: {
    student() {
      return this.$store.getters.findStudent(this.$route.params.id);
    }
  },
  methods: {
    async submit() {
      axios.put(`http://localhost:3000/students/${this.$route.params.id}`, { firstName: this.student.firstName, lastName: this.student.lastName });
    }
  },
  components: {
      Students
  }
};
</script>