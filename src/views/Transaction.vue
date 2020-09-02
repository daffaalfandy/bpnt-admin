<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <h5 class="card-header h3 text-center">Mulai Periode Penjualan</h5>
      <div class="card-body">
        <div class="text-center h4 mt-4">Periode BPNT</div>
        <form>
          <div class="row mt-5">
            <div class="col-6 mx-auto">
              <div class="form-inline">
                <div class="form-group">
                  <label for="datepick" style="font-weight: 400"
                    >Pilih Tanggal:</label
                  >
                  <input
                    v-model="datepick"
                    type="date"
                    class="form-control ml-5"
                    id="datepick"
                  />
                  <div class="invalid-feedback mb-0" id="invalid-date">
                    Silahkan pilih tanggal.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-10 mx-auto">
              <div id="start-form">
                <label style="font-weight: 400" for="kks-number"
                  >Masukkan nomor KKS:</label
                >
                <div id="start-form"></div>
                <input
                  disabled
                  type="text"
                  id="kks-number-1"
                  name="kks-number-1"
                  maxlength="4"
                  class="form-control"
                  v-model="kks1"
                />

                <input
                  disabled
                  type="text"
                  id="kks-number-2"
                  name="kks-number-2"
                  maxlength="4"
                  class="form-control"
                  v-model="kks2"
                />
                <input
                  type="text"
                  id="kks-number-3"
                  name="kks-number-3"
                  maxlength="4"
                  class="form-control"
                  v-model="kks3"
                />
                <input
                  type="text"
                  id="kks-number-4"
                  name="kks-number-4"
                  maxlength="4"
                  class="form-control"
                  v-model="kks4"
                />
              </div>
              <div class="invalid-feedback mb-0" id="invalid-kks">
                Masukkan nomor KKS dengan benar.
              </div>
            </div>
            <div class="container text-center mt-4">
              <button
                id="btn-main"
                class="btn btn-primary px-4 mb-5"
                @click.prevent="startPeriode"
              >
                Mulai
              </button>
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
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <div class="modal-body text-center">
              <div class="form-inline mb-3" id="start-form">
                <input
                  disabled
                  type="text"
                  maxlength="4"
                  class="form-control"
                  v-model="kks1"
                />

                <input
                  disabled
                  type="text"
                  maxlength="4"
                  class="form-control"
                  v-model="kks2"
                />
                <input
                  disabled
                  type="text"
                  maxlength="4"
                  class="form-control"
                  v-model="kks3"
                />
                <input
                  disabled
                  type="text"
                  maxlength="4"
                  class="form-control"
                  v-model="kks4"
                />
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
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Kecamatan KPM"
                  v-model="kpmData.subDistrict"
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
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="addNewKpm"
              >
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; //eslint-disable-line no-undef
import { kks1, kks2 } from "../../config/config";

export default {
  data() {
    return {
      datepick: "",
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
    ...mapActions(["addKpm", "fetchOneKpm"]),
    async addNewKpm() {
      await this.addKpm(this.kpmData);
      $("#exampleModal").modal("hide"); //eslint-disable-line no-undef
    },
    checkValidation() {
      if (this.datepick === "") {
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
          console.log("terdaftar");
        }
        // this.$router.push("/input-kpm");
      }
    },
    _changeFocus(currentIndex, dest) {
      let intIndex = parseInt(currentIndex);
      if (dest === "next") {
        intIndex += 1;
      } else {
        intIndex -= 1;
      }
      const nextElement = document.getElementById(`kks-number-${intIndex}`);
      nextElement.focus();
    },
    watchKKSEvent() {
      for (let i = 3; i <= 4; i++) {
        document
          .getElementById(`kks-number-${i}`)
          .addEventListener("keyup", (e) => {
            this._onKKSKeyUpEvent(i, e);
          });
        document
          .getElementById(`kks-number-${i}`)
          .addEventListener("click", () => {
            document.getElementById(`kks-number-${i}`).select();
          });
      }
    },
    _onKKSKeyUpEvent(currentIndex, event) {
      const inputKKSNumber = document.getElementById(
        `kks-number-${currentIndex}`
      );
      const inputLength = inputKKSNumber.value.length;
      if (inputLength === 4) {
        if (currentIndex < 4) {
          this._changeFocus(currentIndex, "next");
        }
      }
      if (inputLength === 0) {
        if (event.keyCode === 8) {
          if (currentIndex > 1) {
            this._changeFocus(currentIndex, "before");
          }
        }
      }
    },
  },
  mounted() {
    this.watchKKSEvent();
  },
  computed: mapGetters(["getKpm"]),
};
</script>
