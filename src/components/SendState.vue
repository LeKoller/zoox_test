<template>
  <div class="container">
    <form @submit.prevent="createDistrict">
      <input
        type="text"
        name="nameField"
        placeholder="Nome do estado"
        v-model="state.creationObject.name"
      />
      <input
        type="text"
        name="abbreviationField"
        placeholder="Abreviação"
        v-model="state.creationObject.abbreviation"
      />
      <button>Registrar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

export default {
  name: "SendState",
  setup() {
    const state = reactive({
      creationObject: {
        name: "",
        abbreviation: "",
      },
    });

    const createDistrict = async () => {
      await axios
        .post("http://localhost:4000/states/register", state.creationObject)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return { state, createDistrict };
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
  }
}

h3 {
  margin: 40px 0 0;
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
