<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ kpm.name }}</td>
    <td>{{ formatKks(kpm.kks) }}</td>
    <td>
      <a class="btn py-0 my-0 px-0 mx-0" @click.prevent="onClickDetail">
        <span class="text-blue fas fa-info-circle"></span>
      </a>
      &nbsp; &nbsp; &nbsp; / &nbsp; &nbsp; &nbsp;
      <a class="btn py-0 my-0 px-0 mx-0" @click.prevent="onClickDelete">
        <span class="fas fa-trash-alt text-red"></span>
      </a>
    </td>
  </tr>
</template>

<script>
/*global Swal*/
/*eslint no-undef: "error"*/
import { mapActions, mapMutations } from "vuex";

export default {
  props: {
    kpm: Object,
    index: Number,
  },
  methods: {
    ...mapActions(["deleteOneKpm"]),
    ...mapMutations(["setKpm"]),
    onClickDetail() {
      this.setKpm(this.kpm);
      this.$router.push({ path: "/kpm-detail" });
    },
    onClickDelete() {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak akan dapat mengulang ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus sekarang",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.value) {
          this.deleteOneKpm({ _id: this.kpm._id }).then(() => {
            this.$emit("kpmDeleted");
            Swal.fire("Dihapus!", "Data berhasil dihapus.", "success");
          });
        }
      });
    },
  },
};
</script>
