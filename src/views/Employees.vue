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
                <th>Nama</th>
                <th>Hak Akses</th>
                <th>Password</th>
                <th>Aksi</th>
              </tr>
            </thead>
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
                  required
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
/*global $*/
/*eslint no-undef: "error"*/

export default {
  data() {
    return {
      isEdit: false,
      form: {
        name: "",
        role: "",
        password: "",
      },
    };
  },
  methods: {
    onClickAdd() {
      $("#exampleModal").modal("show");
    },
  },
};
</script>
