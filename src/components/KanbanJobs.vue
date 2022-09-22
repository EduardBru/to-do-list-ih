<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for
meter las create tarea en cada columna
Hacer mediaquery para que las columnas sean en column no en row-->
<template>
<main class="content">
        <form  @submit.prevent="handleCreateState" >
        <input name="title" v-model="newState" placeholder="Insert your new State here">
    <input type="submit" value="Create State" class="btn btn-primary btn-block">
  </form>
    <div v-if="wrongState">
      <modalButton :buttonModalText="wrongStateText" @child-hide-event="childHide" ></modalButton>
    </div>
     <div class="kanban_container">
    <div v-for="(stateData, index) in states" :key="index" class="state-column ">
    <kanbanColumn :stateData = "stateData" :indexNumber="parseInt(index)"></kanbanColumn>
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
    gap: 20px;
  }
  .state-column{
    width: 400px;
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
  body{
    margin-top:20px;
    background: #fafafa
}

.card {
    margin-bottom: 1.5rem;
    box-shadow: 0 .25rem .5rem rgba(0, 0, 0, .025)
}

.card-border-primary {
    border-top: 4px solid #2979ff
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
.btn {
  background-color: #2DC5FA;
  border-color: #2DC5FA;
}
</style>
