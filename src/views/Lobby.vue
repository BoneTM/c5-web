<template>
  <div>
    <!--    <el-page-header @back="goBack" content="房间中"> </el-page-header>-->
    <!--    <el-button type="primary" @click="leaveLobby">离开房间</el-button>-->
<!--    <el-row :gutter="20">-->
<!--      <el-col :span="5" type="flex" justify="space-between">-->
<!--        <el-card-->
<!--          class="player-tag"-->
<!--          shadow="hover"-->
<!--          v-for="(item, index) in players.slice(0, 5)"-->
<!--          :key="index"-->
<!--        >-->
<!--          {{ item }}-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="14">-->
<!--        <el-card shadow="hover">-->
<!--          de_dust2-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="5">-->
<!--        <el-card-->
<!--          class="player-tag"-->
<!--          shadow="hover"-->
<!--          v-for="(item, index) in players.slice(5, 10)"-->
<!--          :key="index"-->
<!--        >-->
<!--          {{ item }}-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row type="flex" justify="center">-->
<!--      <el-button type="success">开始比赛</el-button>-->
<!--    </el-row>-->
  </div>
</template>
<script>
import { getLobbyInfo } from '../api/lobby';

export default {
  data() {
    return {
      players: [
        'asd1',
        'asd2',
        'asd3',
        'asd4',
        'asd5',
        'asd6',
        'asd7',
        'asd8',
        'asd9',
        'asd',
      ],
    };
  },
  created() {
    // this.$stomp.subscribe('/user/queue/message', (msg) => {
    //   if (msg.body === 'playerJoin') {
    //     this.fetchPlayers();
    //   }
    // });
    // this.fetchPlayers();
  },
  methods: {
    // async goBack() {
    //   this.$router.back();
    // },
    async leaveLobby() {
      const res = await this.$axios.delete('lobby/123/player');
      this.players = res.data;
      this.$router.back();
    },
    async fetchPlayers() {
      const res = await getLobbyInfo({ lobbyId: '123' });
      this.players = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.player-tag {
  margin-bottom: 20px;
}
</style>
