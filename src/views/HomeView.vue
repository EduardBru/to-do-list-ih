<template>
  <div class="home">
  <h1>prueba</h1>
  <kanbanJobs></kanbanJobs>
  <button @click="handleSignOut">Sign Out </button>

  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';// @ is an alias to /src
import kanbanJobs from '@/components/KanbanJobs.vue';

export default {
  name: 'HomeView',
  components: { kanbanJobs },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signOut']),
    handleSignOut() {
      this.signOut();
    },
  },
  watch: {
    user() {
      if (!this.user) {
        console.log('user logged out');
        this.$router.push({ path: '/auth' });
      }
    },
  },
};
</script>
