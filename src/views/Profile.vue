<template>
  <div>
    asdasd
  </div>
</template>
<script>
export default {
  data() {
    return { players: [] };
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
    // async leaveLobby() {
    //   const res = await this.$axios.delete('lobby/123/player');
    //   this.players = res.data.data;
    //   this.$router.back();
    // },
    // async fetchPlayers() {
    //   const res = await this.$axios.get('lobby/123');
    //   this.players = res.data.data;
    // },
  },
};
</script>
