<template>
  <div class="navbar2 navbar-home">
    <div>
      <h1>IronKanban</h1>
    </div>
    <div class="homebtn">
      <button @click="handleSignOut" id="signout-button">Sign Out</button>
    </div>
  </div>
  <div class="home rotate-content">
    <kanbanJobs class="containerOne"></kanbanJobs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user'; // @ is an alias to /src
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
<style>
.home {
  margin-left: 5%;
  width: 90%;
  margin-right: 5%;
  overflow-x: scroll;
  height: fit-content;
}
.navbar-home {
  width: 100%;
  position: fixed;
  top: 0px;
}
.navbar-div {
  max-width: 100vw;
}
.navbar2 div {
  color: white;
  height: 100%;
  width: 50%;
  min-width: 150px;
}
.navbar2 div h1 {
  margin: 5px 0px 0px 50px;
}
.homebtn {
  display: flex;
  justify-content: flex-end;
}
#signout-button {
  min-width: 140px;
}
.containerOne {
  width: 80%;
  position: relative;
}
</style>
