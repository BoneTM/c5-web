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
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>激活码管理</v-toolbar-title>
          <v-spacer></v-spacer>
          <!--          <v-btn>使用记录</v-btn>-->
          <v-dialog v-model="codeDialogVisible" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on">
                生成激活码
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">生成激活码</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="个数"
                        v-model="codeForm.number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="天数"
                        v-model="codeForm.time"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" text @click="codeDialogVisible = false">
                  取消
                </v-btn>
                <v-btn
                  color="blue"
                  text
                  @click="onCreate"
                  :loading="codeFormButtonLoading"
                >
                  生成
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
import { createCode, getCodes } from '../api/code';

export default {
  data() {
    return {
      headers: [
        { text: '激活码', value: 'code' },
        { text: '有效期', value: 'time' },
        { text: '操作', value: 'actions', sortable: false },
      ],
      list: [],
      loading: true,
      codeDialogVisible: false,
      codeForm: { time: '', number: '' },
      codeFormButtonLoading: false,
    };
  },
  async mounted() {
    await this.fetchList();
  },
  methods: {
    async fetchList() {
      this.loading = true;
      try {
        const { data } = await getCodes();
        this.list = data;
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
    async onCreate() {
      this.codeFormButtonLoading = true;
      await createCode(this.codeForm);
      this.codeDialogVisible = false;
      this.codeFormButtonLoading = false;
      await this.fetchList();
    },
    onCopy(item) {
      this.$copyText(`激活码:${item.code} 有效期:${item.time}天`).then(
        () => {
          this.$toast('复制成功');
        },
        () => {
          this.$toast('复制失败');
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.player-tag {
  margin-bottom: 20px;
}
</style>
