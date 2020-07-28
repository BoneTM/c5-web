<template>
  <div>
    <v-card class="mx-auto my-10" max-width="400">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{
            rankme.name
          }}</v-list-item-title>
          <!--          <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>-->
        </v-list-item-content>
      </v-list-item>

      <!--      <v-card-text>-->
      <!--        <v-row align="center">-->
      <!--          <v-col class="display-3" cols="6">-->
      <!--            23&deg;C-->
      <!--          </v-col>-->
      <!--          <v-col cols="6">-->
      <!--            <v-img-->
      <!--              src="https://cdn.vuetifyjs.com/images/cards/sun.png"-->
      <!--              alt="Sunny image"-->
      <!--              width="92"-->
      <!--            ></v-img>-->
      <!--          </v-col>-->
      <!--        </v-row>-->
      <!--      </v-card-text>-->

      <!--      <v-list-item>-->
      <!--        <v-list-item-icon>-->
      <!--          <v-icon>mdi-send</v-icon>-->
      <!--        </v-list-item-icon>-->
      <!--        <v-list-item-subtitle>23 km/h</v-list-item-subtitle>-->
      <!--      </v-list-item>-->

      <!--      <v-list-item>-->
      <!--        <v-list-item-icon>-->
      <!--          <v-icon>mdi-cloud-download</v-icon>-->
      <!--        </v-list-item-icon>-->
      <!--        <v-list-item-subtitle>48%</v-list-item-subtitle>-->
      <!--      </v-list-item>-->

      <v-list class="transparent">
        <v-list-item>
          <v-list-item-title>KDR</v-list-item-title>

          <v-list-item-subtitle class="text-right">
            {{
              `${
                rankme.deaths
                  ? (rankme.kills / rankme.deaths).toFixed(2)
                  : rankme.kills
              } (${rankme.kills} / ${rankme.deaths})`
            }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <!--      <v-divider></v-divider>-->

      <!--      <v-card-actions>-->
      <!--        <v-btn text>Full Report</v-btn>-->
      <!--      </v-card-actions>-->
    </v-card>
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
import { getProfile, getProfileMatch } from '../api/profile';

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
      rankme: {},
    };
  },
  watch: {
    $route: 'getData',
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.fetch();
      this.fetchMatch();
    },
    async fetch() {
      const { steam } = this.$route.params;
      const { data } = await getProfile({ steam });
      this.rankme = data;
    },
    async fetchMatch() {
      this.loading = true;
      try {
        const { steam } = this.$route.params;
        const { data } = await getProfileMatch({ steam });
        this.list = data;
      } catch (e) {}
      this.loading = false;
    },
    onRow(item) {
      this.$router.push('/match/' + item.matchId);
    },
  },
};
</script>
