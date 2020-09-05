<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <h5 class="card-header h3 text-center">Mulai Periode Penjualan</h5>
      <div class="card-body">
        <div class="text-center h4 mt-4">Periode BPNT</div>
        <form>
          <div class="row mt-5">
            <div class="col-6 mx-auto">
              <div class="form-inline justify-content-center">
                <div class="form-group">
                  <label for="datepick" style="font-weight: 400">Pilih Tanggal:</label>
                  <input
                    @change="onChangeDatepick"
                    type="date"
                    class="form-control ml-5"
                    id="datepick"
                  />
                  <!-- <MainTransaction month="juli" year="2020"></MainTransaction> -->
                </div>
                <div class="invalid-feedback mb-0" id="invalid-date">Silahkan pilih tanggal.</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-10 mx-auto">
              <div id="start-form">
                <label style="font-weight: 400" for="kks-number">Masukkan nomor KKS:</label>
                <div id="start-form"></div>
                <input disabled type="text" maxlength="4" class="form-control" v-model="kks1" />

                <input disabled type="text" maxlength="4" class="form-control" v-model="kks2" />
                <input type="text" maxlength="4" class="form-control" v-model="kks3" />
                <input type="text" maxlength="4" class="form-control" v-model="kks4" />
              </div>
              <div class="invalid-feedback mb-0" id="invalid-kks">Masukkan nomor KKS dengan benar.</div>
            </div>
            <div class="container text-center mt-4">
              <button
                id="btn-main"
                class="btn btn-primary px-4 mb-5"
                @click.prevent="startPeriode"
              >Mulai</button>
            </div>
          </div>
        </form>
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
          <form @submit.prevent="addNewKpm">
            <div class="modal-body text-center">
              <div class="form-inline mb-3" id="start-form">
                <input disabled type="text" maxlength="4" class="form-control" v-model="kks1" />

                <input disabled type="text" maxlength="4" class="form-control" v-model="kks2" />
                <input disabled type="text" maxlength="4" class="form-control" v-model="kks3" />
                <input disabled type="text" maxlength="4" class="form-control" v-model="kks4" />
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
import { mapGetters, mapActions } from "vuex"; //eslint-disable-line no-undef
import { kks1, kks2 } from "../../config/config";

export default {
  components: {
    // MainTransaction,
  },
  data() {
    return {
      datepick: {
        date: "",
        month: "",
        year: "",
      },
      kks1: kks1,
      kks2: kks2,
      kks3: "",
      kks4: "",
      kpmData: {
        kks: "",
        name: "",
        hamlet: "",
        rt: "",
        village: "",
        subDistrict: "",
      },
    };
  },
  methods: {
    /*global Swal, $*/
    /*eslint no-undef: "error"*/
    ...mapActions(["addKpm", "fetchOneKpm", "changeDatepick", "fetchGoods"]),
    onChangeDatepick() {
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      let value = document.getElementById("datepick").value.split("-");
      this.datepick.year = value[0];
      this.datepick.month = months[Number(value[1]) - 1];
      this.datepick.date = value[2];

      this.changeDatepick(this.datepick);
    },
    async addNewKpm() {
      this.addKpm(this.kpmData).then(() => {
        $("#exampleModal").modal("hide"); //eslint-disable-line no-undef
        Swal.fire("Success!", "KPM Berhasil Terdaftar", "success");
        this.fetchGoods({
          month: this.datepick.month,
          year: this.datepick.year,
        }).then(() => {
          this.$router.push({ path: "/main-transaction" });
        });
      });
    },
    checkValidation() {
      if (
        this.datepick.date === "" &&
        this.datepick.month === "" &&
        this.datepick.year === ""
      ) {
        document.getElementById("invalid-date").style.display = "block";
        return false;
      } else {
        document.getElementById("invalid-date").style.display = "none";
      }
      if (this.kks3 === "" || this.kks4 === "") {
        document.getElementById("invalid-kks").style.display = "block";
        return false;
      } else {
        document.getElementById("invalid-kks").style.display = "none";
        this.kpmData.kks = this.kks1 + this.kks2 + this.kks3 + this.kks4;
      }

      return true;
    },
    async startPeriode() {
      if (this.checkValidation()) {
        // Add condition from backend here
        await this.fetchOneKpm({ kks: this.kpmData.kks });
        if (this.getKpm.kpm.length === 0) {
          $("#exampleModal").modal("show"); //eslint-disable-line no-undef
        } else {
          this.fetchGoods({
            month: this.datepick.month,
            year: this.datepick.year,
          }).then(() => {
            this.$router.push({ path: "/main-transaction" });
          });
        }
      }
    },
  },
  mounted() {},
  computed: mapGetters(["getKpm"]),
};
</script>
