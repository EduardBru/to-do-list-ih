<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable vuejs-accessibility/alt-text -->
<!-- eslint-disable max-len -->
<template>
  <div class="col-12 col-lg-6 col-xl-3">
    <div class="card card-border-primary">
      <div class="card-header">
        <div v-if="editState" class="edit-state">
          <form @submit.prevent="handleModifyState(states[stateIndex], stateNameOut)">
            <input v-model="stateNameOut" :placeholder="states[stateIndex]" />
            <div>
              <input type="submit" value=" " class="icon-action icon-save" />
              <button @click="handleDeleteState" class="icon-action icon-delete"></button>
              <button @click="editState = !editState" class="icon-action icon-edit"></button>
            </div>
          </form>
          <div v-if="deleteTasks">
            <modalButton :buttonModalText="popupText" @child-hide-event="childHide"></modalButton>
          </div>
        </div>
        <div v-else class="edit-state">
          <h2>{{ states[stateIndex] }}</h2>
          <button @click="editState = !editState" class="icon-action icon-edit"></button>
        </div>
      </div>
    </div>
    <div v-for="item in getTasksByState" :key="item.id">
      <!-- <h3>{{ index }} {{ item.state }}</h3> -->
      <taskComp :taskId="item.id"></taskComp>
    </div>
  </div>
  <form @submit.prevent="handleCreateTask" class="create-task-container">
    <div>
    <div class= "create-task-form">
      <div>
      <label for="title">Title</label>
    </div>
    <div>
      <input name="title" v-model="taskObject.title" placeholder="Insert your task name here" />
    </div>
    </div>
    <div class= "create-task-form">
      <div>
        Estimation
      </div>
      <div>
      <label for="estimate"> </label>
       <input name="estimate"
        v-model.number="taskObject.estimate"
        placeholder="Insert"
        type="number" class="placeholder-small"
      />
    </div>
    </div>
  </div>
  <div>
    <input type="submit" value="Create Task" class="btn btn-primary btn-block" />
  </div>
  </form>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import taskStore from '@/store/task';
import taskComp from './TaskComp.vue';
import modalButton from './ModalButton.vue';

const defaultData = {
  title: '',
  estimate: 0,
  state: 0,
  user_id: '',
  subtasks: [],
};
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
      taskObject: {
        title: '',
        estimate: 0,
        state: 0,
        user_id: '',
        subtasks: [],
      },
      addTask: false,
      editState: false,
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
      if (stateOut === '' || !stateOut.length);
      else {
        this.modifyState(stateIn, stateOut);
        this.stateName = this.stateNameOut;
        this.editState = false;
      }
    },
    handleDeleteState() {
      if (this.getTasksByState.length === 0) {
        this.deleteState(this.stateName);
        this.updateTasksWhenDeleteingState(this.stateIndex);
        this.stateName = this.states[this.stateIndex];
        this.editState = false;
      } else {
        this.deleteTasks = true;
      }
    },
    childHide() {
      this.deleteTasks = false;
    },
    handleCreateTask() {
      this.taskObject.user_id = this.user.id;
      this.taskObject.state = this.indexNumber;
      this.createTask(this.taskObject);
      this.taskObject = { ...defaultData };
    },
  },
  async created() {
    defaultData.state = this.stateData;
    this.stateName = this.stateData;
    this.stateIndex = this.indexNumber;
  },
};
</script>

<style>
.task_data {
  border: 0px;
  width: 200px;
}
.kanban_container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  width: 100vw;
}
.state-column {
  width: fit-content;
}
.state-data {
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
.card {
  margin-bottom: 1.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.025);
}

.card-border-primary {
  border-top: 4px solid #2979ff;
}

.card-border-secondary {
  border-top: 4px solid #efefef;
}

.card-border-success {
  border-top: 4px solid #00c853;
}

.card-border-info {
  border-top: 4px solid #3d5afe;
}

.card-border-warning {
  border-top: 4px solid #ff9100;
}

.card-border-danger {
  border-top: 4px solid #ff1744;
}

.card-border-light {
  border-top: 4px solid #f8f9fa;
}

.card-border-dark {
  border-top: 4px solid #6c757d;
}

.card-header {
  border-bottom-width: 1px;
}

.card {
  margin-bottom: 1.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.025);
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
  border-radius: 0.2rem;
  width: 100%;
  width: 400px;
}

.card-header:first-child {
  border-radius: calc(0.2rem - 1px) calc(0.2rem - 1px) 0 0;
}

.card-header {
  border-bottom-width: 1px;
  width: 100%;
}
.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  color: inherit;
  background-color: #fff;
  border-bottom: 1px solid #e5e9f2;
  width: 100%;
}
.col-12,
.col-lg-6,
.col-xl-3 {
  width: 100%;
}
.icon-action {
  height: 20px;
  width: 20px;
  background-size: cover;
  border: 0px;
}
.icon-action:hover {
  background-color: darkgray;
}
.icon-save {
  background-image: url("../../images/Noun_Project_Save_Icon_1527077.svg");
}
.icon-edit {
  background-image: url("../../images/edit_modify_icon-icons.com_72390.png");
}
.icon-delete {
  background-image: url("../../images/icons8-delete-48.png");
}
.edit-state {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 46px;
  flex: 1 1;
}
.edit-state form {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}
.edit-state form div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}
.edit-state div button {
  display: inline;
}
.edit-state div h2 {
  display: inline;
}
.create-task-container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.create-task-form{
  display: flex;
  width: 120%;
  flex-direction: row;
  justify-content: space-between;
}
</style>
