<template>
  <div></div>
</template>

<script>
import { mapMutations } from "vuex"; //eslint-disable-line no-undef

export default {
  methods: {
    ...mapMutations(["logoutAdmin"]),
  },
  created() {
    this.logoutAdmin();

    this.$router.replace({ path: "/login" });
  },
};
</script>
