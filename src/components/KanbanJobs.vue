<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for
  Esto es un componente que carga las tareas y dibuja la tabla de kanban
-->
<template>
  <h1>Kanban Table</h1>
  <div class="kanban_container">
    <div v-for="state in states" :key="state" class="state-column">
      <div v-for="item in tasks" :key="item.id" >
        <taskComp :taskProp = "item" v-if="state === item.state"></taskComp>
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
const defaultSubTask = {
  subtask_name: '',
  is_completed: false,
};
export default {
  name: 'kanbanJobs',
  components: { taskComp },
  data() {
    return {
      subTaskObject: {
        subtask_name: '',
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
      this.deleteTask(taskId);
    },
    handleUpdateTask(taskId) {
      this.updateTask(taskId);
    },
    handleCreateSubTask(taskId) {
      this.subTaskObject.user_id = this.user.id;
      this.subTaskObject.task = taskId;
      this.createSubTask(this.subTaskObject, taskId);
      this.subTaskObject = { ...defaultSubTask };
    },
    getSubtaskById(subtaskId) {
      const localSubtask = this.subtasks.filter((subtask) => subtask.id === subtaskId);
      this.subTaskObject.subtask_name = localSubtask[0].subtask_name;
      this.subTaskObject.is_completed = localSubtask[0].is_completed;
      return localSubtask;
    },
  },
  async created() {
    try {
      await this.fetchTasks(); // here we call fetch user
      await this.fetchStates(); // here we call fetch states
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
