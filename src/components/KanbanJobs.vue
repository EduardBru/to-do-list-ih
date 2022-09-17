<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for-->
<template>
  <form  @submit.prevent="handleCreateState" >
    <input name="title" v-model="newState" placeholder="Insert your new State here">
    <input type="submit" value="Create State">
  </form>
    <div v-if="wrongState">
      <modalButton :buttonModalText="wrongStateText" @child-hide-event="childHide" ></modalButton>
    </div>
     <div class="kanban_container">
    <div v-for="(stateData, index) in states" :key="index" class="state-column">
    <kanbanColumn :stateData = "stateData" :indexNumber="parseInt(index)"></kanbanColumn>
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
        <option v-for="(state, index) in states" v-bind:value="index" :key="state">
        {{ state }}
        </option>
      </select>
      <span>Seleccionado: {{ taskObject.state }} </span>
      <input type="submit" value="Create Task">
    </form>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import taskStore from '@/store/task';
import kanbanColumn from './KanbanColumn.vue';
import modalButton from './ModalButton.vue';

const defaultData = {
  title: '',
  estimate: 0,
  state: 0,
  user_id: '',
};
export default {
  name: 'kanbanJobs',
  components: { kanbanColumn, modalButton },
  data() {
    return {
      selectedState: '',
      taskObject: {
        title: '',
        estimate: 0,
        state: 0,
        user_id: '',
        subtasks: [],
      },
      newState: '',
      wrongStateText: 'States cannot be empty',
      wrongState: false,
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks', 'subtasks']),
    ...mapState(userStore, ['states', 'user']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'createTask']),
    ...mapActions(userStore, ['modifyState', 'createState', 'fetchStates']),
    handleCreateTask() {
      this.taskObject.user_id = this.user.id;
      this.createTask(this.taskObject);
      this.taskObject = { ...defaultData };
    },
    handleCreateState() {
      if (!this.newState) {
        console.log('cannot create an empty state');
        this.wrongState = true;
      } else if (this.newState.length === 0) {
        console.log('cannot create an empty state');
        this.wrongState = true;
      } else {
        this.createState(this.newState);
        this.newState = this.states[this.indexNumber];
      }
    },
    childHide() {
      this.wrongState = false;
      console.log('entro aqui');
    },
  },

  async created() {
    try {
      await this.fetchTasks(); // here we call fetch tasks
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
  .state-data{
    border: 0px;
    width: 200px;
    font-size: 25px;
    color: black;
    font-weight: bold;
  }
  ::placeholder {
    color: black;
    opacity: 1;
  }
</style>
