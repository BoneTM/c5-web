<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="list"
      item-key="name"
      :loading="loading"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>服务器管理</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="serverDialogVisible" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on">
                新增服务器
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">新增服务器</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="名称"
                        v-model="serverForm.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="IP"
                        v-model="serverForm.ip"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="端口"
                        v-model="serverForm.port"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" text @click="serverDialogVisible = false">
                  取消
                </v-btn>
                <v-btn
                  color="blue"
                  text
                  @click="onAdd"
                  :loading="serverFormButtonLoading"
                >
                  增加
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon x-small v-bind="attrs" v-on="on" @click="onCopy(item)">
              <v-icon>mdi-arrange-bring-forward</v-icon>
            </v-btn>
          </template>
          <span>复制</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { addServer, getServers } from '../../api/server';

export default {
  data() {
    return {
      headers: [
        { text: '名称', value: 'name' },
        { text: 'IP', value: 'ip' },
        { text: '端口', value: 'port' },
        { text: '操作', value: 'actions', sortable: false },
      ],
      list: [],
      loading: true,
      serverDialogVisible: false,
      serverForm: { name: '', ip: '', port: '' },
      serverFormButtonLoading: false,
      pagination: {
        page: 0,
        size: 10,
      },
    };
  },
  async mounted() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = true;
      try {
        const { data } = await getServers(this.pagination);
        this.list = data;
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
    async onAdd() {
      this.serverFormButtonLoading = true;
      try {
        await addServer(this.serverForm);
        this.serverDialogVisible = false;
        await this.fetch();
      } catch (e) {
        console.log(e);
      }
      this.serverFormButtonLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.player-tag {
  margin-bottom: 20px;
}
</style>
