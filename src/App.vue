<template>
  <div class="back-ground">
    <nav v-if="user !== null">
      <router-link to="/"></router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import userStore from '@/store/user';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'App',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['fetchUser']),
  },
  async created() {
    try {
      await this.fetchUser();
      console.log(this.user);
      if (!this.user) {
        this.$router.push({ path: '/auth' });
      } else {
        this.$router.push({ path: '/' });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style>
.back-ground {
  width: 100vw;
  height: 200vh;
  margin-top: 100px;
  background-size: cover;
  background-image: url("https://cdn-images-1.medium.com/max/1200/1*69RcxrWXuk385lSxkIYYLA.png");
  background-position: fixed;
  background-repeat: no-repeat;
  z-index: -1;
}
</style>
