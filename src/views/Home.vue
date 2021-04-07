<template>
  <div class="home">
    <EditState v-if="editMode" />
    <ListStates v-else />
  </div>
</template>

<script>
import { computed } from "vue";
import store from "../store";
import ListStates from "@/components/ListStates";
import EditState from "@/components/EditState.vue";

export default {
  name: "Home",
  components: {
    ListStates,
    EditState,
  },
  setup() {
    const editMode = computed(() => store.state.editMode);

    return { editMode };
  },
};
</script>
