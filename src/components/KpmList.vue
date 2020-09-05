<template>
  <tr>
    <td>{{index + 1}}</td>
    <td>{{kpm.name}}</td>
    <td>{{formatKks(kpm.kks)}}</td>
    <td>
      <a>
        <span class="text-blue fas fa-info-circle"></span>
      </a>
      &nbsp; &nbsp; &nbsp; / &nbsp; &nbsp; &nbsp;
      <a @click.prevent="onClickDelete">
        <span class="fas fa-trash-alt text-red"></span>
      </a>
    </td>
  </tr>
</template>

<script>
/*global Swal*/
/*eslint no-undef: "error"*/
import { mapActions } from "vuex";

export default {
  props: {
    kpm: Object,
    index: Number,
  },
  methods: {
    ...mapActions(["deleteOneKpm"]),
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
            Swal.fire("Dihapus!", "Data berhasil dihapus.", "success");
          });
        }
      });
    },
  },
};
</script>