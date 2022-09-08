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
        .select('*')
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
    async updateTask(taskId) {
      const updatedTaskId = this.tasks.map((item) => item.id).indexOf(taskId);
      const updatedTask = this.tasks[updatedTaskId];
      const { data, error } = await supabase
        .from('tasks')
        // eslint-disable-next-line max-len, object-curly-newline
        .update({ title: updatedTask.title, estimate: updatedTask.estimate, state: updatedTask.state, subtasks: updatedTask.subtasks })
        .match({ id: taskId });
      if (error) throw error;
      else {
        this.tasks[updatedTaskId] = { ...data[0] };
      }
    },
    async deleteTask(taskId) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .match({ id: taskId });
      if (error) throw error;
      else {
        const removeIndex = this.tasks.map((item) => item.id).indexOf(taskId);
        this.tasks.splice(removeIndex, 1);
        console.log(removeIndex);
      }
    },
    async createSubTask(subtask, taskId) {
      const { data, error } = await supabase
        .from('subtasks')
        .insert(subtask);
      if (error) throw error;
      else {
        this.subtasks.push(data[0]);
        console.log('cosa cosa cosa', typeof data[0].id);
        const taskToAddIndex = this.tasks.map((item) => item.id).indexOf(taskId);
        if ((this.tasks[taskToAddIndex].subtasks) === null) {
          this.tasks[taskToAddIndex].subtasks = [];
        }
        this.tasks[taskToAddIndex].subtasks.push(data[0].id);
        console.log(this.tasks[taskToAddIndex]);
        await this.updateTask(taskId);
      }
    },
    async fetchSubTasks() {
      const { data } = await supabase
        .from('subtasks')
        .select('*')
        .order('id', { ascending: true });
      this.subtasks = data;
    },
  },
});
