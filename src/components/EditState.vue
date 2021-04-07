<template>
  <div class="container">
    <h1>Editar cidade</h1>
    <form @submit.prevent="">
      <input
        type="text"
        name="nameField"
        placeholder="Nome do estado"
        v-model="state.name"
      />
      <input
        type="text"
        name="abbreviationField"
        placeholder="Abreviação"
        v-model="state.abbreviation"
      />
      <div>
        <button class="deleteButton" @click="deleteDistrict">
          Apagar estado
        </button>
        <button @click="updateDistrict">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import store from "../store";

export default {
  name: "EditState",
  setup() {
    const state = reactive(store.state.targetDistrict);

    const updateDistrict = async () => {
      await axios
        .put(`http://localhost:4000/states/edit/${state._id}`, state)
        .then((res) => res.data)
        .then((data) => console.log(data));

      store.dispatch("setEditMode", "district");
    };

    const deleteDistrict = async () => {
      await axios
        .delete(`http://localhost:4000/states/delete/${state._id}`)
        .then((res) => res.data)
        .then((data) => console.log(data));

      store.dispatch("setEditMode", "district");
    };

    return { state, updateDistrict, deleteDistrict };
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;

  h1 {
    color: #fff;
    opacity: 60%;
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100vw;
    align-items: center;

    input {
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
