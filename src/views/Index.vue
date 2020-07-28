<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="list"
      item-key="id"
      :loading="loading"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:item.number="{ item }">
        <span
          :class="{
            'red--text': item.numOfPlayers >= item.maxPlayers,
            'green--text':
              item.numOfPlayers > 0 && item.numOfPlayers < item.maxPlayers,
          }"
        >
          {{ item.numOfPlayers }} /
          {{ item.maxPlayers }}
        </span>
      </template>
      <template v-slot:item.players="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="item.players.length > 0"
              text
              x-small
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              玩家列表
            </v-btn>
          </template>
          <span>
            <template v-for="item in item.players">{{ item }}<br /></template>
          </span>
        </v-tooltip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text x-small @click="onConnect(item)">
          加入游戏
        </v-btn>
        <v-btn text x-small @click="onCopy(item)">
          复制连接
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Stomp from 'stompjs';
import { joinLobby } from '../api/lobby';
import { getServerInfo, getServers, getServersInfo } from '../api/server';
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      headers: [
        { text: '服务器名称', value: 'name' },
        { text: '地图', value: 'map' },
        { text: '玩家总数', value: 'number' },
        { text: '玩家列表', value: 'players' },
        { text: '操作', value: 'actions', sortable: false },
      ],
      list: [],
      loading: true,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    onConnect(item) {
      location.href = `steam://connect/${item.ip}:${item.port}`;
    },
    onCopy(item) {
      this.$copyText(`connect ${item.ip}:${item.port}`).then(
        () => {
          this.$toast('复制成功');
        },
        () => {
          this.$toast('复制失败');
        }
      );
    },
    async fetch() {
      this.loading = true;
      const { data } = await getServers();
      this.list = data.map((e) => ({
        ...e,
        map: '加载中',
        maxPlayers: '加载中',
        numOfPlayers: '加载中',
      }));
      this.loading = false;
      await this.fetchInfo();
    },
    async fetchInfo() {
      this.list.forEach((item, index) => {
        getServerInfo({ serverId: item.id }).then(({ data }) => {
          this.$set(this.list, index, data);
          // this.list[index] = Object.assign({}, this.list[index], data);
        });
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
