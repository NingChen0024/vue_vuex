import Vuex from 'vuex'
import Vue from 'vue'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        students: []
    },
    getters: {
      students : state => state.students.map(s => ({ 
        ...s, fullName: s.firstName + ' ' + s.lastName
      })),
      findStudent: state => id => state.students.find(s => s.id == id),
      isLoaded: state => !!state.students.length
    },
    mutations: {
      setStudents(state, students){
        state.students = students
      },
      addStudents(state, students){
        state.students.push(students) 
      }
    },
    actions: {
      async getStudents(context){
        const students = (await axios.get('http://localhost:3000/students')).data
        context.commit('setStudents', students)
      },
      async createStudent(context, name){
        const newStudent = (await axios.post("http://localhost:3000/students", name)).data
        context.commit('addStudents', newStudent)
      }
    }
})