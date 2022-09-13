<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for
  Esto es un componente que carga las tareas y dibuja la tabla de kanban
  crear componente kanban column
  crear un getTasksBy State que te devuelva solo las tareas que tienen ese estado un getter,
   que no se como se hacen
-->
<template>
   <div class="kanban_container">
    <div v-for="stateData in states" :key="stateData" class="state-column">
      <form  @submit.prevent="handleModifyState(stateData, stateName)">
        <input v-model = "stateName" placeholder= "stateData" class="task_data">
        <input type="submit" value="Update">
      </form>
      <h2>{{stateData}}</h2>
      <div v-for="item in tasks" :key="item.id" >
        <taskComp :taskProp = "item" v-if="stateData === item.state"></taskComp>
      </div>
    </div>
  </div>
    <form  @submit.prevent="handleCreateTask" >
      <div>
        <label for="title">Title</label>
        <input name="title" v-model="taskObject.title" placeholder="Insert your task name here">
      </div>
      <div>
        <label for="estimate">estimation</label>
        <input name="estimate" v-model.number="taskObject.estimate"
        placeholder="Insert" type="number">
      </div>
      <select v-model="taskObject.state">
        <option v-for="item in states" v-bind:value="item" :key="item">
        {{ item }}
        </option>
      </select>
      <span>Seleccionado: {{ taskObject.state }}</span>
      <input type="submit" value="Create Task">
    </form>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import taskStore from '@/store/task';
import taskComp from './TaskComp.vue';

const defaultData = {
  title: '',
  estimate: 0,
  state: 'To Do',
  user_id: '',
};
export default {
  name: 'kanbanJobs',
  components: { taskComp },
  data() {
    return {
      selectedState: '',
      taskObject: {
        title: '',
        estimate: 0,
        state: 'To Do',
        user_id: '',
        subtasks: [],
      },
      listOfStates: [],
      listOfStateObjects: [],
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks', 'states', 'subtasks']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'createTask', 'fetchStates']),
    ...mapActions(userStore, ['modifyState', 'createState']),
    handleCreateTask() {
      this.taskObject.user_id = this.user.id;
      this.createTask(this.taskObject);
      this.taskObject = { ...defaultData };
    },
    handleModifyState(stateIn, stateOut) {
      console.log(stateIn, stateOut);
      this.modifyState();
    },
  },
  async created() {
    try {
      await this.fetchTasks(); // here we call fetch user
      await this.fetchStates(); // here we call fetch states
    } catch (e) {
      console.log(e);
    }
    this.listOfstates = this.states;
    // pedir ayuda!!
    console.log(this.states.array);
    Object.keys(this.states).foreach((element) => {
      const i = 0;
      const currentState = { id: i, name: element };
      this.listOfStates.push(currentState);
    });
    console.log(this.listOfStates);
  },
};
</script>

<style>
  .task_data{
    border: 0px;
    width: 200px;
  }
  .kanban_container{
    display: flex;
    flex-direction: row;
    align-items:stretch;
    justify-content:space-between;
    width: 100vw;
  }
  .state-column{
    width: 400px;
    border: 3px solid grey;
  }
</style>
