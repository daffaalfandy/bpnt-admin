<template>
  <div class="h-100 my-5 container">
    <div class="row h-100 py-5 justify-content-center align-items-center">
      <div class="card my-5 shadow w-40">
        <article class="card-body">
          <div class="row pt-3 pb-4 mx-auto my-auto">
            <div class="col-3 my-auto mr-0">
              <img src="./assets/images/icon.png" style="max-width: 4em" />
            </div>
            <div class="col-9 my-auto ml-0 pl-0">
              <p
                class="h1"
                style="color: #478419; font-weight: 700; margin-bottom: 0px; padding-bottom: 0px"
              >BPNT Helper</p>
            </div>
          </div>
          <form @submit.prevent="onLogin">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fas fa-user-alt"></i>
                  </div>
                </div>
                <input type="text" class="form-control" placeholder="Username" v-model="username" />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fas fa-key"></i>
                  </div>
                </div>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
            </div>
            <!-- form-group// -->
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">Login</button>
            </div>
            <!-- form-group// -->
          </form>
        </article>
      </div>
      <!-- card.// -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async onLogin() {
      await this.login({ username: this.username, password: this.password });

      this.$router.push({ path: "/" });
    },
  },
};
</script>