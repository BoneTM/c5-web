<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="list"
      item-key="matchId"
      :loading="loading"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:item.score="{ item }">
        {{ `${item.team1Score} : ${item.team2Score}` }}
      </template>
      <template v-slot:item.time="{ item }">
        {{ item.startTime }} ~
        <template v-if="!item.endTime">
          进行中
        </template>
        {{ item.endTime }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="onRow(item)" x-small v-bind="attrs" v-on="on">
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
          </template>
          <span>查看详情</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { getMatches } from '../api/match';
export default {
  data() {
    return {
      headers: [
        { text: '时间', value: 'time', sortable: false },
        { text: '地图名', value: 'map', sortable: false },
        { text: '比分', value: 'score', sortable: false },
        { text: '操作', value: 'actions', sortable: false },
      ],
      list: [],
      loading: true,
    };
  },
  async mounted() {
    this.loading = true;
    const { data } = await getMatches();
    this.list = data;
    this.loading = false;
  },
  methods: {
    onRow(item) {
      this.$router.push('/match/' + item.matchId);
    },
  },
};
</script>

<style scoped lang="scss"></style>
