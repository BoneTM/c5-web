<template>
  <div id="app">
    <el-container>
      <el-header> </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6"><router-view /></el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
