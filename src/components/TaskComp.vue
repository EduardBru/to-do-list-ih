<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for
 Task and subtasks go here
 Pasar una prop y hacer get task by Id en el created y asi simplificar
 mucho el codigo y evitar pasar props grandes
 IDEA HACER LOS BOTONES DE MODIFICAR INVISIBLE Y SUSTITUIR LOS CREATE POR UN +
-->
<template>
     <form  @submit.prevent="handleUpdateTask(taskObject.id)" >
        Task:
        <input v-model="taskObject.title" :placeholder="taskObject.title" class="task_data">
        <input v-model.number="taskObject.estimate"
        placeholder="Insert" type="number" class="task_data">
        <select v-model="taskObject.state"  class="task_data">
          <option v-for="(state, index) in states" v-bind:value="index"
          :placeholder="state" :key="state" >
          {{ state }}
          </option>
        </select>
        Plan Estimate:  {{taskObject.estimate}}
        Status:  {{states[taskObject.state]}}
        <input type="submit" value="Update Task">
      </form>
      <div v-for="subitem in taskObject.subtasks" :key="subitem.id">
        <form  @submit.prevent="handleUpdateSubTask(subitem.id, subitem)" >
            <input name="title" v-model="subitem.subtask_name"
            placeholder="Insert SubTask">
           <input name="is_completed" type="checkbox" v-model="subitem.is_completed"
            placeholder="subitem.is_completed">
            <input type="submit" value="Update Subtask">
          <button @click="handleDeleteSubTask(taskObject.id, subitem.id)">Delete Sub Task </button>
        </form>
      </div>
      <button @click="handleDeleteTask(taskObject.id)">DeleteTask </button>
      <div>
          <form  @submit.prevent="handleCreateSubTask(taskObject.id)" >
            <label for="title">Title</label>
            <input name="title" v-model="subTaskObject.subtask_name"
            placeholder="Insert your subtask name here">
            <input type="submit" value="Create SubTask">
         </form>
      </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import taskStore from '@/store/task';

const defaultSubTask = {
  subtask_name: '',
  is_completed: false,
};
export default {
  name: 'taskComp',
  components: { },
  data() {
    return {
      subTaskObject: {
        subtask_name: '',
        is_completed: false,
      },
      selectedState: '',
      taskObject: {},
    };
  },
  props: {
    taskId: Number,
  },
  computed: {
    ...mapState(taskStore, ['tasks']),
    ...mapState(userStore, ['user', 'states']),
  },
  methods: {
    ...mapActions(taskStore, ['deleteTask', 'updateTask', 'createSubTask', 'fetchSubTasks', 'deleteSubTask', 'updateSubTask', 'getTaskById']),
    handleDeleteTask(taskId) {
      this.deleteTask(taskId);
    },
    handleUpdateTask(taskId) {
      this.updateTask(taskId, this.taskObject);
    },
    handleCreateSubTask(taskId) {
      this.subTaskObject.user_id = this.user.id;
      this.subTaskObject.task = taskId;
      this.createSubTask(this.subTaskObject, taskId);
      this.subTaskObject = { ...defaultSubTask };
    },
    // getSubtaskById(subtaskId) {
    //   if (typeof subtaskId === 'number') {
    //     const localSubtask = this.subtasks.filter((subtask) => subtask.id === subtaskId);
    //     this.subTaskObject.subtask_name = localSubtask[0].subtask_name;
    //     this.subTaskObject.is_completed = localSubtask[0].is_completed;
    //     console.log(localSubtask);
    //     return localSubtask;
    //   }
    //   return null;
    // },
    handleDeleteSubTask(taskId, subtaskId) {
      this.deleteSubTask(taskId, subtaskId);
    },
    handleUpdateSubTask(subtaskId, subtaskData) {
      this.updateSubTask(subtaskId, subtaskData);
    },
  },
  async created() {
    try {
    // await this.fetchSubTasks(); // here we call fetch subtasks
    } catch (e) {
      console.log(e);
    }
    this.taskObject = { ...this.getTaskById(this.taskId)[0] };
  },
};
</script>

<style>
  .task_data{
    border: 0px;
    width: 200px;
  }
</style>
