import Vue from 'vue'
import Vuex from 'vuex'
var fs = require("fs");

import { ipcRenderer } from 'electron';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks:[]

  },
  mutations: {
    setTasks(state,payload){
      return state.tasks=payload;
      
    }
  },
  actions: {
    addTask(context,task){
      let tasks=context.state.tasks;
      tasks.push(task);
      let taskString = JSON.stringify({ "tasks": tasks })
      fs.writeFile("./tasks.json", taskString, (err) => {
        ipcRenderer.send('closeTaskForm')
        context.dispatch('getTasks')
      });
    },
    getTasks(context){
      let tasks = fs.readFile("./tasks.json",'utf8',  (err, data) => {
        
        let jsonData = JSON.parse(data);
        context.commit('setTasks',jsonData.tasks)
      });
    }
  },
  getters:{
   
  }
})
