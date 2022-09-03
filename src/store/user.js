import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
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
      if (error) throw error;
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
      if (error) throw error;
      if (user) this.user = user;
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      else this.user = null;
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
