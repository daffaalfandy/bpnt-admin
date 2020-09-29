<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <div class="card-header">
        <div class="row">
          <h3 class="text-center col-8 mx-auto">Data Karyawan</h3>
          <div class="col-4">
            <button
              class="btn btn-primary float-right"
              @click.prevent="onClickAdd"
            >
              Tambah Karyawan
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="container">
          <table class="main-table mt-2">
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>Nama</th>
                <th>Hak Akses</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody v-if="dataReady">
              <tr v-for="(admin, index) in admins" :key="admin._id">
                <td>{{ index + 1 }}</td>
                <td>{{ admin.username }}</td>
                <td>{{ admin.name }}</td>
                <td>{{ admin.role == 1 ? "Admin" : "Karyawan" }}</td>
                <td>
                  <a
                    class="btn py-0 my-0 px-0 mx-0"
                    @click.prevent="onClickEdit(admin)"
                  >
                    <span class="fas fa-edit text-blue"></span>
                  </a>
                  &nbsp; &nbsp; &nbsp; / &nbsp; &nbsp; &nbsp;
                  <a
                    class="btn py-0 my-0 px-0 mx-0"
                    @click.prevent="onDeleteAdmin(admin._id)"
                  >
                    <span class="fas fa-trash-alt text-red"></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ !isEdit ? "Tambah" : "Edit" }} Data Karyawan
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="onSubmit">
            <div class="modal-body text-center">
              <div class="form-group">
                <input
                  required
                  autofocus
                  type="text"
                  class="form-control"
                  placeholder="Username Karyawan"
                  v-model="form.username"
                />
              </div>
              <div class="form-group">
                <input
                  required
                  autofocus
                  type="text"
                  class="form-control"
                  placeholder="Nama Karyawan"
                  v-model="form.name"
                />
              </div>
              <div class="form-group">
                <select
                  name="role"
                  id="role"
                  class="form-control"
                  v-model="form.role"
                  placeholder="Pilih hak akses"
                >
                  <option value="0">Pilih Hak Akses</option>
                  <option value="1">Admin</option>
                  <option value="2">Karyawan</option>
                </select>
              </div>
              <div class="form-group">
                <input
                  :required="!isEdit"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="form.password"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                {{ isEdit ? "Edit" : "Tambah" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script>
/*global Swal, $*/
/*eslint no-undef: "error"*/
import { mapGetters, mapActions } from "vuex"; //eslint-disable-line no-undef

export default {
  data() {
    return {
      isEdit: false,
      form: {
        name: "",
        username: "",
        role: "",
        password: "",
        _id: "",
      },
      dataReady: false,
    };
  },
  methods: {
    ...mapActions(["registerAdmin", "editAdmin", "deleteAdmin", "fetchAdmins"]),
    onSubmit() {
      if (this.isEdit) {
        this.editAdmin(this.form).then(() => {
          Swal.fire("Success!", "Karyawan Berhasil Disunting", "success");
          $("#exampleModal").modal("hide");
          this.clearForm();
        });
      } else {
        this.registerAdmin(this.form).then(() => {
          Swal.fire("Success!", "Karyawan Berhasil Disunting", "success");
          $("#exampleModal").modal("hide");
          this.clearForm();
        });
      }
    },
    onClickAdd() {
      this.isEdit = false;
      this.clearForm();
      $("#exampleModal").modal("show");
    },
    onDeleteAdmin(_id) {
      if (_id == this.admin._id) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda sedang menggunakan akun ini!",
        });
      } else {
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
            this.deleteAdmin({ _id }).then(() =>
              Swal.fire("Dihapus!", "Data berhasil dihapus.", "success")
            );
          }
        });
      }
    },
    onClickEdit(admin) {
      this.isEdit = true;

      this.form._id = admin._id;
      this.form.name = admin.name;
      this.form.username = admin.username;
      this.form.role = admin.role;

      $("#exampleModal").modal("show");
    },
    clearForm() {
      this.form._id = "";
      this.form.username = "";
      this.form.name = "";
      this.form.role = "";
      this.form.password = "";
    },
  },
  mounted() {
    this.fetchAdmins().then(() => (this.dataReady = true));
  },
  computed: mapGetters(["admins", "admin"]),
};
</script>
