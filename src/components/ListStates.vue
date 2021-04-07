<template>
  <div class="container">
    <h1>Estados já cadastrados</h1>
    <div v-for="district in districtsList" :key="district._id">
      <h3>
        <span class="name" @click="editDistrict(district)">
          {{ district.name }}
        </span>
        -
        <span class="abbreviation" @click="fetchCities(district._id)">{{
          district.abbreviation
        }}</span>
      </h3>
      <div class="citiesContainer">
        <div v-for="city in citiesList[district._id]" :key="city._id">
          <span class="city" @click="editCity(city)">{{ city.name }}</span>
        </div>
        <div v-if="citiesList[district._id] === 0">
          <span class="city">Nenhuma cidade cadastrada ainda</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { computed } from "vue";
import { onBeforeMount } from "@vue/runtime-core";

import store from "../store";

export default {
  name: "ListStates",
  setup() {
    const districtsList = computed(() => store.state.districts);
    const citiesList = computed(() => store.state.selectedDistricts);

    const fetchDistricts = async () => {
      await axios
        .get("http://localhost:4000/states/list")
        .then((res) => res.data)
        .then((data) => {
          store.dispatch("setDistricts", data.states);
        });
    };

    const fetchCities = async (stateId) => {
      if (citiesList.value.stateId === undefined) {
        store.dispatch("setSelectedDistrict", stateId);

        const cities = await axios
          .get(`http://localhost:4000/cities/list/?state=${stateId}`)
          .then((res) => res.data)
          .then((data) => {
            store.dispatch("setCitiesOfSelectedDistrict", data.cities);

            return data.cities;
          });

        if (cities.length === 0) {
          store.dispatch("setNoCityOfSelectedDistrict", stateId);
        }
      }
    };

    const editDistrict = (district) => {
      store.dispatch("setTargetDistrict", district);
      store.dispatch("setEditMode", "district");
    };

    const editCity = (city) => {
      store.dispatch("setTargetCity", city);
      store.dispatch("setEditMode", "city");
    };

    onBeforeMount(() => {
      store.dispatch("setDistricts", {});
      fetchDistricts();
    });

    return { districtsList, citiesList, fetchCities, editDistrict, editCity };
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

  h1 {
    color: #fff;
    opacity: 60%;
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 30px;
  }

  h3 {
    margin: 40px 0 0;
    color: #fff;
    font-size: 1.4rem;
    margin-top: 0;
  }

  .name {
    opacity: 87%;
    cursor: pointer;
  }

  .abbreviation {
    color: #7067ed;
    cursor: pointer;
  }

  .citiesContainer {
    margin-bottom: 20px;

    .city {
      color: #fff;
      opacity: 38%;
      cursor: pointer;
    }
  }
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
