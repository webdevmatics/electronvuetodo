<template>
  <div class="home">

    <h3>Task manager</h3>

    <button @click="openTaskForm">Add new task</button>
    <hr>

    <h3>Tasks</h3>
    <ul>
      <li v-for='(item,index) in tasks' :key='index'>{{item}}</li>
    </ul>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {ipcRenderer} from 'electron'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
    return {
      task:null
    }
  },
  computed:{
    tasks(){
      return this.$store.state.tasks;
    }
  },

  methods:{
    addTask(){
      this.$store.commit('addTask',this.task)
      this.task=null;
    },
    openTaskForm(){
      ipcRenderer.send('openTaskForm')
    }
  },
  mounted(){
    this.$store.dispatch('getTasks')
  },
  created(){
     ipcRenderer.on('form-closed',()=>{
        this.$store.dispatch('getTasks')
      })
  }
}
</script>
