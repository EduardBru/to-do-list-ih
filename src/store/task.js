import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('tasks', {
  state: () => ({
    taskCreated: null,
    tasks: [],
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
      // si tiene subtasks, recuperarlas
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
        // eslint-disable-next-line max-len
        .update({ title: updatedTask.title, estimate: updatedTask.estimate, state: updatedTask.state })
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
  },
});
