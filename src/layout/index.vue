<template>
  <div>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense nav>
          <v-list-item
            link
            v-for="(item, index) in navigation"
            :key="index"
            :to="item.path"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group prepend-icon="mdi-cog" v-if="token" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>管理面板</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link to="/code">
              <v-list-item-content>
                <v-list-item-title>会员卡密</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/admin/server">
              <v-list-item-content>
                <v-list-item-title>服务器</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="indigo" dark clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ sitename }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="loginDialogVisible = true">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>

    <v-dialog v-model="loginDialogVisible" persistent max-width="300px">
      <v-card>
        <v-card-title>管理员登录</v-card-title>
        <v-card-text>
          <v-form>
            <ValidationObserver
              ref="loginObserver"
              v-slot="{ validate, reset }"
            >
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="账号"
                      rules="required"
                    >
                      <v-text-field
                        label="账号"
                        :error-messages="errors"
                        v-model="loginForm.username"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="密码"
                      rules="required"
                    >
                      <v-text-field
                        type="password"
                        label="密码"
                        :error-messages="errors"
                        v-model="loginForm.password"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-container>
            </ValidationObserver>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="loginDialogVisible = false">
            取消
          </v-btn>
          <v-btn
            color="blue"
            text
            @click="onLogin"
            :loading="loginButtonLoading"
          >
            登陆
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { changeNickname, register, updateUser } from '../api/user';
import { useCode } from '../api/code';
import { required, email, max } from 'vee-validate/dist/rules';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';

extend('required', {
  ...required,
  message: '{_field_} 不能为空',
});
extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
});

export default {
  name: 'Layout',
  computed: {
    ...mapGetters(['sitename', 'token']),
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      drawer: true,
      navigation: [
        { icon: 'mdi-home', text: '首页', path: '/index' },
        { icon: 'mdi-view-list', text: '比赛', path: '/match' },
      ],
      activeIndex: 1,
      isCollapse: false,
      loginForm: { username: '', password:'' },
      loginDialogVisible: false,
      loginButtonLoading: false,
    };
  },
  methods: {
    async onLogin() {
      const valid = await this.$refs.loginObserver.validate();
      if (!valid) return;

      this.loginButtonLoading = true;
      try {
        await this.$store.dispatch('admin/login', this.loginForm);
        this.loginDialogVisible = false;
      } catch (e) {
        console.log(e);
      }
      this.loginButtonLoading = false;
    },
    onLogout() {
      this.$confirm('确定退出当前账号吗?').then((res) => {
        if (res) {
          this.$store.dispatch('admin/resetToken');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
