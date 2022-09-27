<template>
  <div id="app2">
    <transition name="fade" appear>
      <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events-->
      <div class="modal-overlay1" @click="hide"></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal1">
        <p>{{ buttonModalText }}</p>
        <button class="button1" @click="hide">X</button>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'modalButton',
  data() {
    return {
      nothing: true,
    };
  },
  props: {
    buttonModalText: String,
  },
  methods: {
    hide() {
      this.$emit('child-hide-event');
    },
  },
};
</script>
<style>
#app2 {
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
}

.button1 {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  padding: 15px 25px;
  background-image: linear-gradient(to right, #2dc5fa, #8dc6fb);
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
  /* & :hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
 }*/
}

.modal-overlay1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98400;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal1 {
  position: fixed;
  top: 300px;
  left: 50vw;
  transform: translate(-50%, -50%);
  z-index: 99400;
  width: 800px;
  max-width: 400px;
  background-color: #fff;
  border-radius: 16px;
  border: #666 solid 5px;
  padding: 25px;
}

.modal1 p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
</style>
