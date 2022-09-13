import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('tasks', {
  state: () => ({
    taskCreated: null,
    tasks: [],
    subtasks: [],
    states: [],
  }),
  actions: {
    async fetchStates() {
      const { data } = await supabase
        .from('user_config')
        .select('states');
      this.states = data[0].states;
    },
    async fetchTasks() {
      const { data } = await supabase
        .from('tasks')
        .select('*, subtasks (*)')
        .order('id', { ascending: true });
      this.tasks = data;
    },
    async createTask(task) {
      const { data, error } = await supabase
        .from('tasks')
        .insert(task);
      if (error) throw error;
      else {
        this.tasks.push(data[0]);
      }
    },
    async updateTask(taskId, task) {
      const { data, error } = await supabase
        .from('tasks')
        // eslint-disable-next-line max-len, object-curly-newline
        .update({ title: task.title, estimate: task.estimate, state: task.state })
        .match({ id: taskId });
      if (error) throw error;
      else {
        const taskIndex = this.tasks.indexOf(this.tasks.find((taskElem) => taskElem.id === taskId));
        this.tasks[taskIndex] = { ...data[0] };
      }
    },
    async deleteTask(taskId) {
      // eslint-disable-next-line no-plusplus
      const subtaksOfTask = this.tasks.filter((task) => task.id === taskId)[0].subtasks;
      if (subtaksOfTask.length) {
        const promises = [];
        subtaksOfTask.forEach((element) => {
          const deleteSubtaskProm = this.deleteSubTask(taskId, element.id);
          promises.push(deleteSubtaskProm);
          console.log('elementos', element.id);
        });
        Promise.all(promises).then(async () => {
          this.deleteFinalTask(taskId);
        }).catch((error) => {
          console.log(error);
        });
      } else {
        this.deleteFinalTask(taskId);
      }
    },
    async deleteFinalTask(taskId) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .match({ id: taskId });
      if (error) throw error;
      else {
        const removeIndex = this.tasks.map((item) => item.id).indexOf(taskId);
        this.tasks.splice(removeIndex, 1);
      }
    },
    async createSubTask(subtask, taskId) {
      const { data, error } = await supabase
        .from('subtasks')
        .insert(subtask);
      if (error) throw error;
      else {
        const taskToAddIndex = this.tasks.map((item) => item.id).indexOf(taskId);
        if ((this.tasks[taskToAddIndex].subtasks) === null) {
          this.tasks[taskToAddIndex].subtasks = [];
        }
        this.tasks[taskToAddIndex].subtasks.push(data[0]);
        await this.updateTaskSubtask(data[0].id, taskId, taskToAddIndex);
      }
    },
    async updateTaskSubtask(subtaskId, taskId, taskPosition) {
      const positionsArray = this.tasks[taskPosition].subtasks.map((item) => item.id);
      const { error } = await supabase
        .from('tasks')
        .update({ subtasks: positionsArray })
        .match({ id: taskId });
      if (error) throw error;
    },
    async deleteSubTask(taskId, subtaskId) {
      const { error } = await supabase
        .from('subtasks')
        .delete()
        .match({ id: subtaskId });
      if (error) throw error;
      else {
        const taskIndex = this.tasks.map((item) => item.id).indexOf(taskId);
        // eslint-disable-next-line max-len
        const subtaskIndex = this.tasks[taskIndex].subtasks.map((item) => item.id).indexOf(subtaskId);
        this.tasks[taskIndex].subtasks.splice(subtaskIndex, 1);
        await this.updateTaskSubtask(subtaskId, taskId, taskIndex);
      }
    },
    async updateSubTask(subtaskId, subtaskData) {
      const { error } = await supabase
        .from('subtasks')
        // eslint-disable-next-line max-len, object-curly-newline
        .update({ subtask_name: subtaskData.subtask_name, is_completed: subtaskData.is_completed })
        .match({ id: subtaskId });
      if (error) throw error;
    },
    // async fetchSubTasks() {
    //   const { data } = await supabase
    //     .from('subtasks')
    //     .select('*')
    //     .order('id', { ascending: true });
    //   this.subtasks = data;
    // },
  },
});
