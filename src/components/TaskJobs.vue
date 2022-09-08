<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for
  Esto es un componente que carga las tareas, habra otro que las represente
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
        <div v-for="subitem in item.subtasks" :key="subitem">
          <!-- Me tengo que plantear que esto no sea un método sino que
            almacene algun tipo de variable o algo
          Esto hay que modificarlo, y no es trivial-->
          {{getSubtaskById(subitem)[0].subtask_name}}
          {{getSubtaskById(subitem)[0].is_completed}}
        </div>
        <input type="submit" value="Update Task">
      </form>
      <button @click="handleDeleteTask(item.id)">DeleteTask </button>
      <div>
          <form  @submit.prevent="handleCreateSubTask(item.id)" >
            <label for="title">Title</label>
            <input name="title" v-model="subTaskObject.subtask_name"
            placeholder="Insert your subtask name here">
            <input type="submit" value="Create SubTask">
         </form>
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
      subTaskObject: {
        user_id: '',
        subtask_name: '',
        task: '',
        is_completed: false,
      },
      selectedState: '',
      taskObject: {
        title: '',
        estimate: 0,
        state: 'To Do',
        user_id: '',
        subtasks: [],
      },
      listOfSubtasks: [],
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks', 'states', 'subtasks']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'createTask', 'deleteTask', 'fetchStates', 'updateTask', 'createSubTask', 'fetchSubTasks']),
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
    handleCreateSubTask(taskId) {
      this.subTaskObject.user_id = this.user.id;
      this.subTaskObject.task = taskId;
      console.log(this.subTaskObject);
      this.createSubTask(this.subTaskObject, taskId);
    },
    getSubtaskById(subtaskId) {
      return this.subtasks.filter((subtask) => subtask.id === subtaskId);
    },
  },
  async created() {
    try {
      await this.fetchTasks(); // here we call fetch user
      await this.fetchStates(); // here we call fetch states
      await this.fetchSubTasks(); // here we call fetch subtasks
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
