<template>
  <div class= "navbar navbar-home">
    <div>
      <h1>IronKanban</h1>
    </div>
    <div class="homebtn">
    <button @click="handleSignOut" class="signout-button">Sign Out </button>
  </div>
  </div>
  <div class="home">
   <kanbanJobs class= "containerOne"></kanbanJobs>  </div>
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
<style>
.home {
  margin-left: 5%;
  width: 90%;
  margin-right: 5%;
}
.navbar-home {
 position: fixed;
 top: 0px;
}
.navbar div{
  color: white;
  height: 100%;
  width: 50%;
  min-width: 150px;
}
.navbar div h1{
  margin: 0px 0px 0px 50px;
}
.homebtn{
  display: flex;
  justify-content: flex-end;
}
.signout-button{
  color: white;
  background-color: #666;
  height: 50px;
  width: 30%;
  min-width: 100px;
  font-size: 24px;
  border: 0px;
  margin-top: -8px;
}
.containerOne{
  width: 80%;
  position: relative;
}
</style>
