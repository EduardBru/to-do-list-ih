<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for
  hay que crear el form, metiendo el user_id que tengamos en user
  (habra que ver como hacemos eso xq el data no me lo permite, quiza un computed o
   quiza modificandolo en el propio código)
   Tambien hay que revisar que el v-for actualice, cosa que ahora no hace.
   Tambien habra que meter los metodos para hacer el update, no lo veo super dificl la verdad
   esto es un componente que carga las tareas, habra otro que las represente
-->
<template>
    <div>task components incoming</div>
    <div v-for="item in tasks" :key="item.id" >
      <form  @submit.prevent="handleUpdateTask(item.id)" >
      Task:
      <input v-model="item.title" placeholder="item.title" class="task_data">
      <input v-model.number="item.estimate" placeholder="Insert" type="number" class="task_data">
      <select v-model="item.state" placeholder="item.state" class="task_data">
        <option v-for="state in states" v-bind:value="state" :key="state">
        {{ state }}
        </option>
      </select>
      Plan Estimate:  {{item.estimate}}
      Status:  {{item.state}}
      <input type="submit" value="Update Task">
    </form>
      <button @click="handleDeleteTask(item.id)">DeleteTask </button>
    </div>
    <button @click="handleCreateTask">CreateTask </button>
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

const defaultData = {
  title: '',
  estimate: 0,
  state: 'To Do',
  user_id: '',
};
export default {
  name: 'TasksJobs',
  components: { },
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
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks', 'states']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'createTask', 'deleteTask', 'fetchStates', 'updateTask']),
    handleCreateTask() {
      this.taskObject.user_id = this.user.id;
      this.createTask(this.taskObject);
      this.taskObject = { ...defaultData };
    },
    handleDeleteTask(taskId) {
      console.log(taskId);
      this.deleteTask(taskId);
    },
    handleUpdateTask(taskId) {
      console.log(taskId);
      this.updateTask(taskId);
    },
  },
  async created() {
    try {
      await this.fetchTasks(); // here we call fetch user
      console.log(this.tasks);
      await this.fetchStates(); // here we call fetch user
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style>
  .task_data{
    border: 0px;
    width: 200px;
  }
</style>
