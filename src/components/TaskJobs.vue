<!-- hay que crear el form, metiendo el user_id que tengamos en user
  (habra que ver como hacemos eso xq el data no me lo permite, quiza un computed o
   quiza modificandolo en el propio código)
   Tambien hay que revisar que el v-for actualice, cosa que ahora no hace.
   Tambien habra que meter los metodos para hacer el update, no lo veo super dificl la verdad
-->
<template>
    <div>task components incoming</div>
    <div v-for="item in tasks" :key="item.id" > {{item}}</div>
    <button @click="handleCreateTask">CreateTask </button>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import taskStore from '@/store/task';

export default {
  name: 'TasksJobs',
  components: { },
  data() {
    return {
      taskObject: {
        title: 'pepe',
        estimate: 2,
        state: 'To Do',
        user_id: 'db7367e9-bf26-49cc-8ffd-8a7bdcc9601b',
      },
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'createTask']),
    handleCreateTask() {
      this.createTask(this.taskObject);
    },
  },
  async created() {
    try {
      await this.fetchTasks(); // here we call fetch user
      console.log(this.tasks);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
