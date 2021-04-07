<template>
  <div class="container">
    <form @submit.prevent="">
      <input
        type="text"
        name="nameField"
        placeholder="Nome da cidade"
        v-model="state.name"
      />
      <select name="stateIdField" v-model="state.stateId">
        <option class="options" value="" disabled selected>
          <span id="placeholder">Selecione seu estado</span>
        </option>
        <option
          class="options"
          v-for="(item, index) in districts"
          :key="index"
          :value="item._id"
        >
          {{ item.name }}
        </option>
      </select>
      <div>
        <button class="deleteButton" @click="deleteCity">Apagar cidade</button>
        <button @click="updateCity">Registrar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed, onBeforeMount } from "vue";
import axios from "axios";
import store from "../store";

export default {
  name: "EditState",
  setup() {
    const state = reactive(store.state.targetCity);

    const districts = computed(() => store.state.districts);

    const fetchDistricts = async () => {
      await axios
        .get("http://localhost:4000/states/list")
        .then((res) => res.data)
        .then((data) => {
          store.dispatch("setDistricts", data.states);
        });
    };

    const updateCity = async () => {
      await axios
        .put(`http://localhost:4000/cities/edit/${state._id}`, state)
        .then((res) => res.data)
        .then((data) => console.log(data));

      store.dispatch("setEditMode", "city");
    };

    const deleteCity = async () => {
      await axios
        .delete(`http://localhost:4000/cities/delete/${state._id}`)
        .then((res) => res.data)
        .then((data) => console.log(data));

      store.dispatch("setEditMode", "city");
    };

    onBeforeMount(() => {
      fetchDistricts();
    });

    return { state, districts, updateCity, deleteCity };
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  width: 100vw;

  form {
    display: flex;
    flex-direction: column;
    width: 100vw;
    align-items: center;

    input,
    select {
      background-color: transparent;
      outline: none;
      border: none;
      border-bottom: 1px solid #1e1e1e;
      color: #7067ed;
      width: 40%;
      font-size: 1.2rem;
      margin: 20px;

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        background-color: transparent;
      }

      #placeholder {
        color: #fff;
        opacity: 38%;
      }
    }

    .options {
      background-color: #101010;
      color: #fff;
      outline: none;
      border: none;

      &:hover {
        background: #1e1e1e;
        color: #fff;
        opacity: 38%;
      }
    }

    button {
      outline: none;
      border: none;
      background-color: #42b983;
      color: #121212;
      font-weight: 600;
      font-size: 1.1rem;
      padding: 4px 12px 4px 12px;
      cursor: pointer;
      transition: all 0.25s ease;
      margin-top: 24px;

      &:hover {
        transform: scale(1.05, 1.05);
      }

      &:active {
        transform: scale(0.8, 0.8);
      }

      &:disabled {
        color: dimgray;
        transform: scale(1, 1);
        cursor: default;
      }
    }
    .deleteButton {
      background-color: #7067ed;
      margin-right: 20px;

      &:hover {
        color: #501111;
      }
    }
  }
}
</style>
