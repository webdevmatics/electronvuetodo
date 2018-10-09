<template>
  <div class="home">

    <form @submit.prevent="addTask">
        <input type="text" v-model="task">

        <button type='submit'>submit</button>
    </form>

  </div>
</template>

<script>
import {ipcRenderer} from 'electron';
// @ is an alias to /src
export default {
  
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
      this.$store.dispatch('addTask',this.task)
      this.task=null;

    }
  },
  mounted(){
      this.$store.dispatch('getTasks')
  }
}
</script>
