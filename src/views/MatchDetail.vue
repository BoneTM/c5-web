<template>
  <div>
    <template v-for="(team, teamIndex) in players">
      <v-data-table
        dense
        :headers="headers"
        :items="team"
        item-key="steam64"
        :loading="loading"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:item.firstkill="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span class="text-decoration-underline" v-bind="attrs" v-on="on">
                {{ item.firstkillT + item.firstkillCt }}
              </span>
            </template>
            <span>
              T:{{ item.firstkillT }}
              <br />
              CT:{{ item.firstkillCt }}
              <br />
            </span>
          </v-tooltip>
        </template>
        <template v-slot:item.headshotRate="{ item }">
          {{ item.kills ? (item.headshotKills / item.kills).toFixed(2) : 0 }}
        </template>
        <template v-slot:item.adr="{ item }">
          {{
            match.team1Score + match.team2Score
              ? (item.damage / (match.team1Score + match.team2Score)).toFixed(1)
              : 0
          }}
        </template>
        <template v-slot:item.k="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span class="text-decoration-underline" v-bind="attrs" v-on="on">
                {{ item.k2 + item.k3 + item.k4 + item.k5 }}
              </span>
            </template>
            <span>
              2Kill:{{ item.k2 }}
              <br />
              3Kill:{{ item.k3 }}
              <br />
              4Kill:{{ item.k4 }}
              <br />
              5Kill:{{ item.k5 }}
            </span>
          </v-tooltip>
        </template>
        <template v-slot:item.v="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span class="text-decoration-underline" v-bind="attrs" v-on="on">
                {{ item.v1 + item.v2 + item.v3 + item.v4 + item.v5 }}
              </span>
            </template>
            <span>
              1v1:{{ item.v1 }}
              <br />
              1v2:{{ item.v2 }}
              <br />
              1v3:{{ item.v3 }}
              <br />
              1v4:{{ item.v4 }}
              <br />
              1v5:{{ item.v5 }}
              <br />
            </span>
          </v-tooltip>
        </template>
      </v-data-table>

      <div class="text-h1 text-center" v-if="teamIndex === 0 && match.team1Score">
        {{ `${match.team1Score} : ${match.team2Score}` }}
      </div>
    </template>
  </div>
</template>

<script>
import { getMatchDetail } from '../api/match';

export default {
  props: {
    msg: String,
  },
  data() {
    return {
      headers: [
        { text: '名称', value: 'name' },
        { text: '杀', value: 'kills' },
        { text: '助', value: 'assists' },
        { text: '死', value: 'deaths' },
        { text: '爆头', value: 'headshotKills', sortable: false },
        { text: '爆头率', value: 'headshotRate', sortable: false },
        { text: 'ADR', value: 'adr', sortable: false },
        { text: '首杀', value: 'firstkill', sortable: false },
        { text: '多杀', value: 'k', sortable: false },
        { text: '残局', value: 'v', sortable: false },
      ],
      players: [[], []],
      match: {},
      loading: true,
    };
  },
  async mounted() {
    this.loading = true;
    const { matchId } = this.$route.params;
    const { data } = await getMatchDetail({ matchId });
    data.players.forEach((e) => {
      this.players[e.team === 'team1' ? 0 : 1].push(e);
    });
    this.match = data.match;

    this.loading = false;
  },
  methods: {
    handleDetail(row) {
      this.$router.push(row.id);
    },
    goBack() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style scoped lang="scss"></style>
