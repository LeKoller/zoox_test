<template>
  <div class="container">
    <form @submit.prevent="createCity">
      <input
        type="text"
        name="nameField"
        placeholder="Nome da cidade"
        v-model="state.creationObject.name"
      />
      <select name="stateIdField" v-model="state.creationObject.stateId">
        <option class="options" value="" disabled selected>
          <span id="placeholder">Selecione seu estado</span>
        </option>
        <option
          class="options"
          v-for="(item, index) in statesList"
          :key="index"
          :value="item._id"
        >
          {{ item.name }}
        </option>
      </select>
      <button>Registrar</button>
    </form>
    <transition class="animate__animated animate__fadeInUp">
      <div v-if="state.created.name" class="createdBlock">
        <h3>Cidade de {{ state.created.name }} salva com sucesso!</h3>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, computed } from "vue";
import { onBeforeMount } from "@vue/runtime-core";

import store from "../store";

export default {
  name: "SendCity",
  setup() {
    const state = reactive({
      creationObject: {
        name: "",
        stateId: "",
      },
      created: {},
    });

    const statesList = computed(() => store.state.districts);

    const fetchDistricts = async () => {
      await axios
        .get("http://localhost:4000/states/list")
        .then((res) => res.data)
        .then((data) => {
          store.dispatch("setDistricts", data.states);
        });
    };

    const createCity = async () => {
      await axios
        .post("http://localhost:4000/cities/register", state.creationObject)
        .then((res) => res.data)
        .then((data) => {
          state.created = data.city;
        })
        .catch((err) => {
          console.log(err);
        });

      state.creationObject.name = "";
      setInterval(() => {
        state.created = {};
      }, 6000);
    };

    onBeforeMount(() => {
      fetchDistricts();
    });

    return { state, statesList, createCity };
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
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
  }
}

h3 {
  margin: 40px 0 0;
  font-weight: 400;
  color: #fff;
  opacity: 60%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
