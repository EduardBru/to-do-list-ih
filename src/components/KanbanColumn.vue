<template>
<form  @submit.prevent="handleModifyState(states[stateIndex], stateNameOut)">
    <input v-model = "stateNameOut" :placeholder= "states[stateIndex]" class="state-data">
    <input type="submit" value="Update">
  </form>
  <button @click="handleDeleteState">Delete State </button>
  <div v-if="deleteTasks">
      <modalButton :buttonModalText="popupText" @child-hide-event="childHide" ></modalButton>
    </div>
  <h2>{{states[stateIndex]}}</h2>
  <div v-for="item in getTasksByState" :key="item.id" >
    <!-- <h3>{{ index }} {{ item.state }}</h3> -->
    <taskComp :taskId = "item.id" ></taskComp>
  </div>

</template>
<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import taskStore from '@/store/task';
import taskComp from './TaskComp.vue';
import modalButton from './ModalButton.vue';

export default {
  name: 'kanbanColumn',
  components: { taskComp, modalButton },
  data() {
    return {
      stateName: '',
      stateNameOut: '',
      stateIndex: 0,
      popupText: 'Please delete tasks first',
      deleteTasks: false,
    };
  },
  props: {
    stateData: String,
    indexNumber: Number,
  },
  computed: {
    ...mapState(taskStore, ['tasks', 'subtasks']),
    ...mapState(userStore, ['states', 'user']),
    getTasksByState() {
      return this.tasks.filter((item) => item.state === this.stateIndex);
    },
  },
  methods: {
    ...mapActions(taskStore, ['createTask', 'updateTasksWhenDeleteingState']),
    ...mapActions(userStore, ['modifyState', 'createState', 'fetchStates', 'deleteState']),
    handleModifyState(stateIn, stateOut) {
      console.log(stateIn, stateOut);
      this.modifyState(stateIn, stateOut);
      this.stateName = this.stateNameOut;
    },
    handleDeleteState() {
      console.log(this.stateName);
      if (this.getTasksByState.length === 0) {
        this.deleteState(this.stateName);
        this.updateTasksWhenDeleteingState(this.stateIndex);
        this.stateName = this.states[this.stateIndex];
      } else {
        console.log('please delete tasks in the state first');
        this.deleteTasks = true;
      }
    },
    childHide() {
      this.deleteTasks = false;
      console.log('entro aqui');
    },
  },
  async created() {
    this.stateName = this.stateData;
    this.stateIndex = this.indexNumber;
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
