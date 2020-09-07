<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <div class="card-header pr-5">
        <div class="row">
          <div class="col-lg-10 col-12 mx-auto">
            <div class="row">
              <h3 class="text-center col-12 my-auto">Riwayat Transaksi / Form Kontrol</h3>
              <small
                class="text-center text-secondary col-12 my-auto"
              >*Silahkan gunakan laptop atau komputer untuk menyimpan dalam bentuk PDF*</small>
            </div>
          </div>
          <button class="btn btn-info col-2 export-to-pdf">
            Simpan ke PDF
            <span class="fas fa-file-pdf ml-2"></span>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="container mb-3">
          <div class="main-form mb-0">
            <label for="datepick">Pilih Tanggal:</label>
            <input
              @change="onChangeDatepick"
              id="datepick"
              type="date"
              class="form-control mr-1 ml-1"
            />
            <button
              class="btn btn-primary mr-1"
              style="font-size: 0.9em"
              @click.prevent="onClickDate"
            >Berdasarkan Tanggal</button>
            <button
              class="btn btn-primary"
              style="font-size: 0.9em"
              @click.prevent="onClickMonth"
            >Berdasarkan Bulan</button>
          </div>
        </div>
        <div class="container">
          <small
            class="text-left text-secondary my-auto"
          >*Silahkan simpan dalam bentuk PDF untuk detail lebih lengkap*</small>
          <table class="main-table mt-2">
            <thead>
              <tr>
                <th>No</th>
                <th>Nomor KKS</th>
                <th>Tanggal Transaksi</th>
                <th>Jenis Komoditi</th>
              </tr>
            </thead>
            <tbody v-if="datepick !== null">
              <tr v-for="(transaction, index) in pageOfItems" :key="transaction._id">
                <td>{{index + 1}}</td>
                <td>{{formatKks(transaction.kks)}}</td>
                <td>{{transaction.datepick.date}}, {{transaction.datepick.month}} {{transaction.datepick.year}}</td>
                <td>{{loopsItems(transaction.items)}}</td>
              </tr>
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
            transaction.transaction.length > 10
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
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      kks1: kks1,
      kks2: kks2,
      kks3: "",
      kks4: "",
      datepick: {},
      allItems: {},
      pageOfItems: [],
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
    ...mapActions(["getTransactionBasedOnDate", "getTransactionBasedOnMonth"]),
    async onClickDate() {
      if (this.datepick.month) {
        await this.getTransactionBasedOnDate(this.datepick);

        this.allItems = this.transaction.transaction;

        this.dataReady = true;
      }
    },
    async onClickMonth() {
      if (this.datepick.month) {
        await this.getTransactionBasedOnMonth({
          datepick: { month: this.datepick.month, year: this.datepick.year },
        });

        this.allItems = this.transaction.transaction;

        this.dataReady = true;
      }
    },
    loopsItems(items) {
      let result = "";
      items.forEach((item) => {
        result += `${item.name} ${item.qty}${item.unit}, `;
      });
      return result;
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
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
    },
  },
  computed: mapGetters(["transaction"]),
};
</script>