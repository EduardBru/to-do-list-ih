<template>
  <section>
    <router-view class="app-main" /> <!-- your routes will load inside of these tags -->    
  </section>
</template>
 
<script >
import userStore from '@/store/user';
import {mapState, mapActions} from 'pinia';

export default {
  name: 'App',
  computed: {
    ...mapState(userStore, )
  },
  
}


 
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
 
onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' });
    } else {
      // continue to dashboard
      router.push({ path: '/' });
    }
  } catch (e) {
    console.log(e)
  }
})
</script>
 
