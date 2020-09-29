<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <h3 class="card-header text-center">Transaksi Pembelian</h3>
      <div class="card-body">
        <div class="container-fluid">
          <div class="main-form">
            <label for="month-period">Bulan:</label>
            <input
              list="month-list"
              id="month-period"
              class="form-control"
              style="max-width: 150px"
              v-model="month"
            />
            <datalist id="month-list"></datalist>
            <label for="year-period">Tahun:</label>
            <input
              list="year-list"
              id="year-period"
              class="form-control"
              style="max-width: 75px"
              v-model="year"
            />
            <datalist id="year-list"></datalist>
            <button
              class="btn btn-primary px-4 mr-2"
              @click.prevent="getTransaction"
            >
              Mulai
            </button>
            <button
              class="btn btn-success px-4"
              @click.prevent="buyGood"
              disabled
              id="buy-good"
            >
              Beli Barang
            </button>
          </div>
        </div>
        <div class="container">
          <table class="main-table">
            <thead>
              <tr>
                <th>Tanggal Transaksi</th>
                <th>Nama Barang</th>
                <th>Jumlah Barang</th>
                <th>Stok Awal</th>
                <th>Stok Akhir</th>
                <th>Harga Beli</th>
                <th>Harga Jual</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="purchase in goodsTransaction.purchase"
                :key="purchase._id"
              >
                <td>{{ formatDatetime(purchase.createdAt) }}</td>
                <td>{{ purchase.name }}</td>
                <td>
                  {{ purchase.qty.toLocaleString("id-ID") }} {{ purchase.unit }}
                </td>
                <td>
                  {{
                    purchase.oldStock !== 0
                      ? `${purchase.oldStock.toLocaleString("id-ID")} ${
                          purchase.unit
                        }`
                      : `${purchase.oldStock} ${purchase.unit}`
                  }}
                </td>
                <td>
                  {{ purchase.stock.toLocaleString("id-ID") }}
                  {{ purchase.unit }}
                </td>
                <td>{{ purchase.buyPrice.toLocaleString("id-ID") }}</td>
                <td>{{ purchase.sellPrice.toLocaleString("id-ID") }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex"; //eslint-disable-line no-undef

const date = new Date();
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

export default {
  data() {
    return {
      month: this.getMonth(),
      year: date.getFullYear().toString(),
    };
  },
  methods: {
    ...mapActions(["fetchGoodsTransaction"]),
    ...mapMutations(["setMonthYear"]),
    getMonth() {
      const currentMonthNumber = date.getMonth();
      const currentMonth = months[currentMonthNumber];
      return currentMonth;
    },
    buyGood() {
      this.$router.push("/purchase-transaction");
    },
    async getTransaction() {
      await this.fetchGoodsTransaction({ month: this.month, year: this.year });
      this.setMonthYear({ month: this.month, year: this.year });
    },
  },
  async mounted() {
    if (this.month !== "" && this.year !== "") {
      this.setMonthYear({ month: this.month, year: this.year });
      document.getElementById("buy-good").disabled = false;
      await this.fetchGoodsTransaction({ month: this.month, year: this.year });
    }
  },
  computed: mapGetters(["goodsTransaction"]),
};
</script>
