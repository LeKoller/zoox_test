<template>
  <div class="home">
    <EditState v-if="editMode.district" />
    <EditCity v-else-if="editMode.city" />
    <ListStates v-else />
  </div>
</template>

<script>
import { computed } from "vue";
import store from "../store";
import ListStates from "@/components/ListStates";
import EditState from "@/components/EditState";
import EditCity from "@/components/EditCity";

export default {
  name: "Home",
  components: {
    ListStates,
    EditState,
    EditCity,
  },
  setup() {
    const editMode = computed(() => store.state.editMode);

    return { editMode };
  },
};
</script>
