import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('user', {
  state: () => ({
    user: null,
    states: [],
  }),
  actions: {
    async fetchStates() {
      const { data } = await supabase
        .from('user_config')
        .select('states');
      this.states = data[0].states;
    },
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async createUserConfig() {
      const { error } = await supabase
        .from('user_config')
        .insert({ states: ['To Do', 'Doing', 'Done'], user_id: this.user.id });
      if (error) throw error;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        console.log(error);
        throw error;
      }

      if (user) {
        this.user = user;
        await this.createUserConfig();
      }
    },

    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) {
        console.log('problemitaaaa');
        console.log(error.message);
        throw error;
      }
      if (user) this.user = user;
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      else this.user = null;
    },
    async updateStates(statesArray) {
      const { data, error } = await supabase
        .from('user_config')
        .update({ states: statesArray })
        .match({ user_id: this.user.id });
      if (error) throw error;
      else {
        this.states = data[0].states;
      }
    },
    async createState(stateIn) {
      const statesArray = this.states;
      statesArray.push(stateIn);
      await this.updateStates(statesArray);
    },
    async modifyState(stateIn, stateOut) {
      const statePosition = this.states.indexOf(stateIn.toString());
      const statesArray = this.states;
      statesArray.splice(statePosition, 1, stateOut);
      await this.updateStates(statesArray);
    },
    async deleteState(stateIn) {
      const statePosition = this.states.indexOf(stateIn.toString());
      console.log(statePosition);
      const statesArray = this.states;
      statesArray.splice(statePosition, 1);
      console.log(statesArray);
      await this.updateStates(statesArray);
    },

  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage,
      },
    ],
  },
});
