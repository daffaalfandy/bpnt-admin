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
              <button class="btn btn-primary float-right">
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
                <kpm-list :key="kpm._id" :index="index" :kpm="kpm"></kpm-list>
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
  </div>
</template>

<script>
import { kks1, kks2 } from "../../config/config";
import { mapGetters, mapActions } from "vuex";
import KpmList from "../components/KpmList";

export default {
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
    };
  },
  methods: {
    ...mapActions(["fetchKpm", "fetchOneKpm"]),
    async onClickSearch() {
      if (this.kks3 !== "" && this.kks4 !== "") {
        let payload = {
          kks: this.kks1 + this.kks2 + this.kks3 + this.kks4,
        };
        await this.fetchOneKpm(payload);
        this.allItems = [];
        this.allItems[0] = this.getKpm.kpm;
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
