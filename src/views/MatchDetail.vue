<template>
  <div>
    <el-page-header @back="goBack" content="详情页面" v-loading="loading">
    </el-page-header>
    <el-table :data="team1" style="width: 100%;">
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="kills" label="击杀"> </el-table-column>
      <el-table-column prop="deaths" label="死亡"> </el-table-column>
      <el-table-column prop="headshot" label="爆头"> </el-table-column>
    </el-table>
    <el-table :data="team2" style="width: 100%;">
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="kills" label="击杀"> </el-table-column>
      <el-table-column prop="deaths" label="死亡"> </el-table-column>
      <el-table-column prop="headshot" label="爆头"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import service from '../utils/request';
export default {
  name: 'Index',
  props: {
    msg: String,
  },
  data() {
    return { team1: [], team2: [], loading: true };
  },
  async created() {
    this.loading = true;
    const res = await service.get(`match/${this.$route.params.id}`);
    if (!res.data) return;

    const matchPlayerStats = res.data.data.matchPlayerStats;
    this.team1 = matchPlayerStats.filter((e) => e.team === 0);
    this.team2 = matchPlayerStats.filter((e) => e.team === 1);
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
