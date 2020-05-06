<template>
  <div>
    <el-table :data="tableData" style="width: 100%;" v-loading="loading">
      <el-table-column label="开始时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px;">{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="map" label="地图名"> </el-table-column>
      <el-table-column label="比分">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">
            {{ `${scope.row.team1Score} : ${scope.row.team2Score}` }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.row)">
            查看详情
          </el-button>
          <!--          <el-button size="mini" @click="handleDetail(scope.row)">-->
          <!--            下载DEMO-->
          <!--          </el-button>-->
        </template>
      </el-table-column>
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
    return { tableData: [], loading: true };
  },
  async created() {
    this.loading = true;
    const res = await service.get('match');
    if (!res.data) return;
    this.tableData = res.data.data;
    this.loading = false;
  },
  methods: {
    handleDetail(row) {
      this.$router.push({ path: `/match/${row.id}` });
    },
  },
};
</script>

<style scoped lang="scss"></style>
