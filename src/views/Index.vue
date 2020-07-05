<template>
  <div>
    <!--    <el-button type="primary" plain @click=""-->
    <!--      >登陆</el-button-->
    <!--    >-->
    <!--    <el-button type="primary" @click="createLobby">创建房间</el-button>-->
<!--    <el-button type="primary" @click="joinLobby">加入房间</el-button>-->
  </div>
</template>

<script>
import Stomp from 'stompjs';
import { joinLobby } from '../api/lobby';
export default {
  name: 'Index',
  props: {
    msg: String,
  },
  data() {
    return {
      tableData: [],
      loading: true,
    };
  },
  methods: {
    async createLobby() {
      try {
        const res = await this.$axios.post('lobby');
        if (!res.data) return;
      } catch (e) {}
    },
    async joinLobby() {
      try {
        const lobbyId = '123';
        const res = await joinLobby({ lobbyId });
        await this.$router.push(`/lobby/${lobbyId}`);
      } catch (e) {}
    },
  },
};
</script>

<style scoped lang="scss"></style>
