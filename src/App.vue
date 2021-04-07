<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/create_state">Cadastrar Estado</router-link> |
    <router-link to="/create_city">Cadastrar Cidade</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #101010;
}

#nav a {
  font-weight: bold;
  color: #fff;
  opacity: 38%;
}

#nav a.router-link-exact-active {
  color: #42b983;
  opacity: 100%;
}
</style>
