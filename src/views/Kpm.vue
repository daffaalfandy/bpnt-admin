<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <h3 class="card-header text-center">Data KPM</h3>
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-7">
              <form>
                <div class="form-group row">
                  <div class="col-3 pr-0">
                    <input type="text" disabled maxlength="4" class="form-control" v-model="kks1" />
                  </div>
                  <div class="col-3 pr-0">
                    <input type="text" disabled maxlength="4" class="form-control" v-model="kks2" />
                  </div>
                  <div class="col-3 pr-0">
                    <input type="text" maxlength="4" class="form-control" v-model="kks3" />
                  </div>
                  <div class="col-3 pr-0">
                    <input type="text" maxlength="4" class="form-control" v-model="kks4" />
                  </div>
                </div>
              </form>
              <div class="invalid-feedback mb-0" id="invalid-kks">Masukkan nomor KKS dengan benar.</div>
            </div>
            <div class="col-5 text-left">
              <button @click.prevent="onClickSearch" class="btn btn-info pl-3">
                Cari
                <span class="fas fa-search ml-2"></span>
              </button>
              <button @click.prevent="onClickAddKpm" class="btn btn-primary float-right">
                Tambah KPM
                <span class="fas fa-plus ml-2"></span>
              </button>
            </div>
          </div>
        </div>
        <div class="container">
          <table class="main-table mt-2">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>No. KKS</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(kpm, index) in pageOfItems">
                <kpm-list @kpmDeleted="onKpmDeleted" :key="kpm._id" :index="index" :kpm="kpm"></kpm-list>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer">
        <jw-pagination
          v-if="dataReady"
          :items="allItems"
          @changePage="onChangePage"
          :labels="customLabels"
          :style="
            allKpm.allKpm.length > 10
              ? 'display: inline-block'
              : 'display: none !important;'
          "
        ></jw-pagination>
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
            <h5 class="modal-title" id="exampleModalLabel">Tambah Data KPM</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="onSubmitAddKpm">
            <div class="modal-body text-center">
              <div class="form-inline mb-3" id="start-form">
                <input disabled type="text" maxlength="4" class="form-control" v-model="kks1" />

                <input disabled type="text" maxlength="4" class="form-control" v-model="kks2" />
                <input type="text" maxlength="4" class="form-control" required v-model="kks3" />
                <input type="text" maxlength="4" class="form-control" required v-model="kks4" />
              </div>
              <div class="form-group">
                <input
                  required
                  autofocus
                  type="text"
                  class="form-control"
                  placeholder="Nama KPM"
                  v-model="kpmData.name"
                />
              </div>
              <div class="form-inline">
                <input
                  type="text"
                  class="form-control mr-4"
                  placeholder="Dusun KPM"
                  v-model="kpmData.hamlet"
                  required
                />
                <input
                  type="text"
                  class="form-control ml-5"
                  placeholder="RT KPM"
                  v-model="kpmData.rt"
                />
              </div>
              <div class="form-group mt-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Desa KPM"
                  v-model="kpmData.village"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Kecamatan KPM"
                  v-model="kpmData.subDistrict"
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Tambah</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script>
import { kks1, kks2 } from "../../config/config";
import { mapGetters, mapActions } from "vuex";
import KpmList from "../components/KpmList";

export default {
  /*global $, Swal*/
  /*eslint no-undef: "error"*/
  components: {
    "kpm-list": KpmList,
  },
  data() {
    return {
      kks1: kks1,
      kks2: kks2,
      kks3: "",
      kks4: "",
      pageOfItems: [],
      allItems: {},
      customLabels: {
        first: "Awal",
        last: "Akhir",
        previous: "<",
        next: ">",
      },
      dataReady: false,
      kpmData: {},
    };
  },
  methods: {
    ...mapActions(["fetchKpm", "fetchOneKpm", "addKpm"]),
    onSubmitAddKpm() {
      this.kpmData.kks = this.kks1 + this.kks2 + this.kks3 + this.kks4;
      this.kpmData.fetchAll = true;
      this.addKpm(this.kpmData)
        .then(() => {
          this.kpmData = {};
          this.kks3 = "";
          this.kks4 = "";

          $("#exampleModal").modal("hide");
          this.onKpmDeleted();
          Swal.fire("Success!", "KPM Berhasil Terdaftar", "success");
        })
        .catch(() => {
          this.kks3 = "";
          this.kks4 = "";
          Swal.fire({
            icon: "error",
            title: "Nomor KKS Sudah Terdaftar",
            text: "Silahkan periksa kembali nomor KKS",
            footer: "Jika tetap error, silahkan hubungi kami",
          });
        });
    },
    onClickAddKpm() {
      this.kks3 = "";
      this.kks4 = "";

      $("#exampleModal").modal("show");
    },
    onKpmDeleted() {
      this.allItems = this.allKpm.allKpm;
      this.kks3 = "";
      this.kks4 = "";
    },
    async onClickSearch() {
      if (this.kks3 !== "" && this.kks4 !== "") {
        let payload = {
          kks: this.kks1 + this.kks2 + this.kks3 + this.kks4,
        };
        await this.fetchOneKpm(payload);
        this.allItems = [];
        if (this.getKpm.kpm._id) {
          this.allItems[0] = this.getKpm.kpm;
        }
      } else {
        this.allItems = this.allKpm.allKpm;
      }
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
  },
  async mounted() {
    await this.fetchKpm();
    this.allItems = this.allKpm.allKpm;
    this.dataReady = true;
  },
  computed: mapGetters(["allKpm", "getKpm"]),
};
</script>
