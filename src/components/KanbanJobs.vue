<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for-->
<template>
  <main class="overflow-class">
    <form @submit.prevent="handleCreateState" class="create-state-form">
      <div>
        <input
          name="title"
          v-model="newState"
          placeholder="Insert your new State here"
          class="no-border-input"
        />
      </div>
      <div>
        <input type="submit" value="Create State" class="btn btn-primary btn-block" />
      </div>
    </form>
    <div v-if="wrongState">
      <modalButton :buttonModalText="wrongStateText" @child-hide-event="childHide"></modalButton>
    </div>
    <div class="kanban_container">
      <div v-for="(stateData, index) in states" :key="index" class="state-column state-overflow">
        <kanbanColumn :stateData="stateData" :indexNumber="parseInt(index)"></kanbanColumn>
      </div>
    </div>
  </main>
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
        this.wrongState = true;
      } else if (this.newState.length === 0) {
        this.wrongState = true;
      } else {
        this.createState(this.newState);
        this.newState = this.states[this.indexNumber];
      }
    },
    childHide() {
      this.wrongState = false;
    },
  },

  async created() {
    try {
      await this.fetchTasks();
      await this.fetchStates();
    } catch (e) {
      console.log(e);
    }
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
  justify-content: space-between;
  width: 100%;
  gap: 20px;
}
.state-column {
  width: fit-content;
  height: fit-content;
  padding: 10px;
  background-color: lightgrey;
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
body {
  background: #fafafa;
}
.btn {
  background-color: #2dc5fa;
  border-color: #2dc5fa;
}
.create-state-form {
  border: 0px;
  display: flex;
  gap: 20px;
  margin-bottom: 11px;
}
.no-border-input {
  padding-top: 10px;
  border: 0px;
  background-color: transparent;
}
.overflow-class {
  width: 100vw;
  height: fit-content;
  transform: rotateX(180deg);
  -ms-transform: rotateX(180deg); /* IE 9 */
  -webkit-transform: rotateX(180deg); /* Safari and Chrome */
  direction: ltr;
  min-height: 700px;
}
.rotate-content {
  transform: rotateX(180deg);
}
</style>
