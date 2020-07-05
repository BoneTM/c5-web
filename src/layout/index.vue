<template>
  <div>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
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
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="indigo" dark clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>GOD</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-card v-if="username">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ username }}</v-list-item-title>
                  <v-list-item-subtitle>
                    会员时效:{{ vip }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click="codeDialogVisible = true"
                        >
                          <v-icon>mdi-wallet</v-icon>
                        </v-btn>
                      </template>
                      <span>使用激活码</span>
                    </v-tooltip>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                color="primary"
                text
                to="/code"
                v-if="roles.includes('ROLE_ADMIN')"
              >
                激活码管理
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="onLogout">退出登录</v-btn>
            </v-card-actions>
          </v-card>
          <v-list v-else>
            <v-list-item @click="loginDialogVisible = true">
              <v-list-item-title>登陆</v-list-item-title>
            </v-list-item>
            <v-list-item @click="registerDialogVisible = true">
              <v-list-item-title>注册</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
    <v-dialog v-model="registerDialogVisible" persistent max-width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">注册一波</span>
        </v-card-title>
        <v-card-text>
          <ValidationObserver
            ref="registerObserver"
            v-slot="{ validate, reset }"
          >
            <v-container>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="用户名"
                    rules="required"
                  >
                    <v-text-field
                      label="用户名"
                      :error-messages="errors"
                      v-model="registerForm.username"
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
                      label="密码"
                      :error-messages="errors"
                      v-model="registerForm.password"
                      type="password"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="确认密码"
                    rules="required"
                  >
                    <v-text-field
                      label="确认密码"
                      :error-messages="errors"
                      v-model="registerForm.checkPass"
                      type="password"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="绑定码"
                    rules="required"
                  >
                    <v-text-field
                      label="绑定码"
                      :error-messages="errors"
                      v-model="registerForm.code"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </ValidationObserver>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="registerDialogVisible = false"
            >取消</v-btn
          >
          <v-btn
            color="blue"
            text
            @click="onRegister"
            :loading="registerButtonLoading"
            >注册</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="loginDialogVisible" persistent max-width="300px">
      <v-card>
        <v-card-title>登陆一波</v-card-title>
        <v-card-text>
          <v-form v-model="loginValid">
            <ValidationObserver
              ref="loginObserver"
              v-slot="{ validate, reset }"
            >
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="用户名"
                      rules="required"
                    >
                      <v-text-field
                        label="用户名"
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
                        label="密码"
                        type="password"
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
    <v-dialog v-model="codeDialogVisible" persistent max-width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">激活一波</span>
        </v-card-title>
        <v-card-text>
          <ValidationObserver ref="codeObserver" v-slot="{ validate, reset }">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="激活码"
                    rules="required"
                  >
                    <v-text-field
                      label="激活码"
                      v-model="codeForm.code"
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </ValidationObserver>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="codeDialogVisible = false">
            取消
          </v-btn>
          <v-btn color="blue" text @click="onCode" :loading="codeButtonLoading">
            激活
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { register } from '../api/user';
import { useCode } from '../api/code';
import { required, email, max } from 'vee-validate/dist/rules';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate';

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
    ...mapGetters(['username', 'roles', 'vip']),
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
        { icon: 'mdi-home', text: '比赛', path: '/match' },
      ],
      activeIndex: 1,
      isCollapse: false,
      loginValid: true,
      loginForm: { username: '', password: '' },
      registerForm: { username: '', password: '', checkPass: '', code: '' },
      codeForm: { code: '' },
      registerFormRules: {
        username: {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        code: {
          required: true,
          message: '请输入绑定码',
          trigger: 'blur',
        },
      },
      loginDialogVisible: false,
      loginButtonLoading: false,
      registerDialogVisible: false,
      codeButtonLoading: false,
      codeDialogVisible: false,
      registerButtonLoading: false,
    };
  },
  methods: {
    async onLogin() {
      const valid = await this.$refs.loginObserver.validate();
      if (!valid) return;

      this.loginButtonLoading = true;
      try {
        await this.$store.dispatch('user/login', this.loginForm);
        await this.$store.dispatch('user/getInfo');
        this.loginDialogVisible = false;
      } catch (e) {
        console.log(e);
      }
      this.loginButtonLoading = false;
    },
    async onRegister() {
      const valid = await this.$refs.registerObserver.validate();
      if (!valid) return;

      this.registerButtonLoading = true;
      try {
        const { username, password, code } = this.registerForm;
        await register({ username, password, code });
        this.$toast('注册成功');
        this.registerDialogVisible = false;
      } catch (e) {
        console.log(e);
      }
      this.registerButtonLoading = false;
      // this.$refs[formName].validate(async (valid) => {
      //   if (valid) {
      //     const { username, password, code } = this.registerForm;
      //     await register({ username, password, code });
      //   }
      //
      //   this.registerButtonLoading = false;
      // });
    },
    onProfile() {
      this.$router.push({ path: '/profile/Bone' });
    },
    onLogout() {
      this.$confirm('确定退出当前账号吗?').then((res) => {
        if (res) {
          this.$store.dispatch('user/resetToken');
        }
      });
    },
    async onCode() {
      const valid = await this.$refs.codeObserver.validate();
      if (!valid) return;

      this.codeButtonLoading = true;
      try {
        const { data } = await useCode(this.codeForm);
        this.$toast(data);
        this.codeDialogVisible = false;
        await this.$store.dispatch('user/getInfo');
      } catch (e) {}
      this.codeButtonLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
