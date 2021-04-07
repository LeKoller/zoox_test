<template>
  <div class="home">
    <SendState msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import SendState from "@/components/SendState.vue";

export default {
  name: "Home",
  components: {
    SendState,
  },
};
</script>
