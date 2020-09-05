<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <form>
        <div class="card-header pr-5">
          <div class="row">
            <h3 class="text-center my-auto col-10" id="kks-field"></h3>
            <button
              @click.prevent="isEdit ? onSubmit() : onClickEdit() "
              :type="isEdit ? 'submit' : 'button'"
              class="btn col-2"
              :class="isEdit ? 'btn-primary' : 'btn-info'"
            >{{isEdit ? 'Simpan' : 'Ubah'}}</button>
          </div>
        </div>
        <div class="card-body">
          <div class="container">
            <div class="form-group row">
              <label for="name" class="col-4 text-right my-auto">Nama KPM:</label>
              <input
                type="text"
                id="name"
                class="form-control col-6"
                disabled
                v-model="kpm.name"
                required
              />
            </div>
            <div class="form-group row">
              <label for="dusun" class="col-4 text-right my-auto">Dusun:</label>
              <input
                type="text"
                id="dusun"
                class="form-control col-3"
                disabled
                v-model="kpm.hamlet"
                required
              />
              <label for="rt" class="col-1 text-right my-auto">RT</label>
              <input
                type="text"
                class="form-control col-2"
                id="rt"
                disabled
                v-model="kpm.rt"
                required
              />
            </div>
            <div class="form-group row">
              <label for="village" class="col-4 text-right my-auto">Desa:</label>
              <input
                type="text"
                id="village"
                class="form-control col-6"
                disabled
                v-model="kpm.village"
                required
              />
            </div>
            <div class="form-group row">
              <label for="sub-district" class="col-4 text-right my-auto">Kecamatan:</label>
              <input
                type="text"
                id="sub-district"
                class="form-control col-6"
                disabled
                v-model="kpm.subDistrict"
                required
              />
            </div>
          </div>
        </div>
        <div class="container">
          <h3 class="text-center">Riwayat Transaksi</h3>
          <table class="main-table mt-2">
            <thead>
              <tr>
                <th>No</th>
                <th>Komoditi</th>
                <th>Tanggal Transaksi</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in transaction.transaction" :key="item._id">
                <td>{{index + 1}}</td>
                <td>{{loopsItems(item.items)}}</td>
                <td>{{item.datepick.date}}, {{item.datepick.month}} {{item.datepick.year}}</td>
                <td>Rp{{item.overallPrice.toLocaleString('id-ID')}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      kpm: {},
      isEdit: false,
      isReady: false,
    };
  },
  methods: {
    ...mapActions(["getTransaction", "updateOneKpm"]),
    loopsItems(items) {
      let result = "";
      items.forEach((item) => {
        result += `${item.name} ${item.qty}${item.unit}, `;
      });
      return result;
    },
    async onSubmit() {
      await this.updateOneKpm(this.kpm);
      this.isEdit = false;
      this.enableDisableInput();
    },
    onClickEdit() {
      this.isEdit = true;
      this.enableDisableInput();
    },
    enableDisableInput() {
      document.getElementById("name").disabled = !document.getElementById(
        "name"
      ).disabled;
      document.getElementById("dusun").disabled = !document.getElementById(
        "dusun"
      ).disabled;
      document.getElementById("rt").disabled = !document.getElementById("rt")
        .disabled;
      document.getElementById("village").disabled = !document.getElementById(
        "village"
      ).disabled;
      document.getElementById(
        "sub-district"
      ).disabled = !document.getElementById("sub-district").disabled;
    },
  },
  async mounted() {
    document.getElementById("kks-field").innerHTML = `No KKS. ${this.formatKks(
      this.getKpm.kks
    )}`;
    this.kpm = this.getKpm;
    this.getTransaction({ kks: this.getKpm.kks }).then(() => {
      this.isReady = true;
    });
  },
  computed: mapGetters(["getKpm", "transaction"]),
};
</script>