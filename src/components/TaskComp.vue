<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for
 Task and subtasks go here
 Pasar una prop y hacer get task by Id en el created y asi simplificar
 mucho el codigo y evitar pasar props grandes
 IDEA HACER LOS BOTONES DE MODIFICAR INVISIBLE Y SUSTITUIR LOS CREATE POR UN +
-->
<template>
   <div class="card card-border-primary">
      <div class="card-header">
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
            placeholder="subitem.is_completed" class="card-actions float-right">
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
    </div>
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
  .card {
    margin-bottom: 1.5rem;
    box-shadow: 0 .25rem .5rem rgba(0, 0, 0, .025)
}

.card-border-primary {
    border-top: 4px solid #2979ff;
    width: 100%;
}

.card-border-secondary {
    border-top: 4px solid #efefef
}

.card-border-success {
    border-top: 4px solid #00c853
}

.card-border-info {
    border-top: 4px solid #3d5afe
}

.card-border-warning {
    border-top: 4px solid #ff9100
}

.card-border-danger {
    border-top: 4px solid #ff1744
}

.card-border-light {
    border-top: 4px solid #f8f9fa
}

.card-border-dark {
    border-top: 4px solid #6c757d
}

.card-header {
    border-bottom-width: 1px
}

.card-actions a {
    color: #495057;
    text-decoration: none
}

.card-actions svg {
    width: 16px;
    height: 16px
}

.card-actions .dropdown {
    line-height: 1.4
}

.card-title {
    font-weight: 500;
    margin-top: .1rem
}

.card-subtitle {
    font-weight: 400
}

.card-table {
    margin-bottom: 0
}

.card-table tr td:first-child,
.card-table tr th:first-child {
    padding-left: 1.25rem
}

.card-table tr td:last-child,
.card-table tr th:last-child {
    padding-right: 1.25rem
}

.card-img-top {
    height: 100%
}
.card {
    margin-bottom: 1.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0,0,0,.025);
    width: 100%;
}

.card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #e5e9f2;
    border-radius: .2rem;
    width: 100%;
}

.card-header:first-child {
    border-radius: calc(.2rem - 1px) calc(.2rem - 1px) 0 0;
}

.card-header {
    border-bottom-width: 1px;
}
.card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    color: inherit;
    background-color: #fff;
    border-bottom: 1px solid #e5e9f2;
}

</style>
