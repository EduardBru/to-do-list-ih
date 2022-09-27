<!-- eslint-disable max-len -->
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
      <div v-if="!editTask" class="task-container">
        <div class="task-info">
          <h4>{{ taskObject.title }}</h4>
          <h6>Estimated effort: {{ taskObject.estimate }}</h6>
          <h6 v-if="taskObject.subtasks.length">Subtasks:</h6>
          <div v-for="subitem in taskObject.subtasks" :key="subitem.id" class="subtasks-container">
            {{ subitem.subtask_name }}
            <div v-if="!subitem.is_completed">
              <p class="checkbox1"></p>
            </div>
            <div v-else>
              <p class="checkbox1 clicked">✔</p>
            </div>
          </div>
        </div>
        <div class="task-icons">
          <button @click="editTask = !editTask" class="icon-action icon-edit"></button>
        </div>
      </div>
      <div v-else>
        <div class="class-container">
          <form @submit.prevent="handleUpdateTask(taskObject.id)" class="editable-task">
            <div class="task-info">
              <div>
                <h5><input v-model="taskObject.title" :placeholder="taskObject.title" /> &zwnj;</h5>
                <h6>
                  Estimated effort:
                  <input
                    v-model.number="taskObject.estimate"
                    placeholder="Insert"
                    type="number"
                    class="placeholder-small"
                  />
                </h6>
                <h6>
                  State:
                  <select v-model="taskObject.state">
                    <option
                      v-for="(state, index) in states"
                      v-bind:value="index"
                      :placeholder="state"
                      :key="state"
                    >
                      {{ state }}
                    </option>
                  </select>
                </h6>
              </div>
            </div>
            <div class="task-icons">
              <input type="submit" value=" " class="icon-action icon-save" />
              <button
                @click="handleDeleteTask(taskObject.id)"
                class="icon-action icon-delete"
              ></button>
              <button @click="editTask = !editTask" class="icon-action icon-edit"></button>
            </div>
          </form>
        </div>
        <h6 v-if="taskObject.subtasks.length">Subtasks:</h6>
        <div class="subtasks-flex">
          <div
            v-for="subitem in taskObject.subtasks"
            :key="subitem.id"
            class="subtasks-container subtasks-container-two"
          >
            <form @submit.prevent="handleUpdateSubTask(subitem.id, subitem)" class="subtasks-form">
              <div class="subtasks-form-data">
                <input name="title" v-model="subitem.subtask_name" placeholder="Insert SubTask" />
                <input
                  name="is_completed"
                  type="checkbox"
                  v-model="subitem.is_completed"
                  placeholder="subitem.is_completed"
                  class="card-actions float-right"
                />
              </div>
              <div class="subtasks-form-buttons">
                <input type="submit" value=" " class="icon-action icon-save" />
                <button
                  @click="handleDeleteSubTask(taskObject.id, subitem.id)"
                  class="icon-action icon-delete"
                ></button>
              </div>
            </form>
          </div>
        </div>
        <br>
      </div>
        <form @submit.prevent="handleCreateSubTask(taskObject.id)" class="create-subtask">
          <div>
          <label for="title"></label>
          <input name="title" v-model="subTaskObject.subtask_name" placeholder="Insert subtask" />
        </div>
        <div class="subtasks-form-buttons">
          <input type="submit" value=" " class="icon-action icon-save" />
        </div>
        </form>
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
  components: {},
  data() {
    return {
      subTaskObject: {
        subtask_name: '',
        is_completed: false,
      },
      selectedState: '',
      taskObject: {},
      editTask: false,
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
    ...mapActions(taskStore, [
      'deleteTask',
      'updateTask',
      'createSubTask',
      'fetchSubTasks',
      'deleteSubTask',
      'updateSubTask',
      'getTaskById',
    ]),
    handleDeleteTask(taskId) {
      this.deleteTask(taskId);
      this.editTask = false;
    },
    handleUpdateTask(taskId) {
      this.updateTask(taskId, this.taskObject);
      this.editTask = false;
    },
    handleCreateSubTask(taskId) {
      this.subTaskObject.user_id = this.user.id;
      this.subTaskObject.task = taskId;
      this.createSubTask(this.subTaskObject, taskId);
      this.subTaskObject = { ...defaultSubTask };
      this.editTask = false;
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
.task_data {
  border: 0px;
  width: 200px;
}
.checkbox1 {
  border: 1px solid black;
  height: 16px;
  width: 14px;
  display: inline-block;
  font-size: 12px;
}
.clicked {
  color: white;
  background-color: #2dc5fa;
  border-color: #2dc5fa;
}
.active {
  visibility: visible;
}
.subtasks-container {
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: space-between;
  margin-left: 10%;
  height: fit-content;
}
.subtasks-container-two {
  width: 90%;
}
.task-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.task-info {
  display: flex;
  flex-direction: column;
  width: 287px;
}
.editable-task {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.task-icons {
  display: flex;
  width: 70px;
  flex-direction: row;
  justify-content: flex-end;
  gap: 2px;
}
.placeholder-small {
  width: 80px;
}
.placeholder-medium {
  width: 180px;
}
.subtasks-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.subtasks-form-data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}
.subtasks-form-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 5px;
}
.subtasks-flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
}
.create-subtask{
  display: flex;
  flex-direction: row;
  width: 95%;
  margin-left: 5%;
  gap: 10px;
  justify-content: space-between;
}
</style>
