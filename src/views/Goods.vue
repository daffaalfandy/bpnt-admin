<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <h3 class="card-header text-center">Data Barang</h3>
      <div class="card-body">
        <div class="container">
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
            <button class="btn btn-primary px-4" @click.prevent="getGoods">
              Mulai
            </button>
          </div>
        </div>
        <div class="container">
          <table class="main-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Stok Barang</th>
                <th>Harga Beli</th>
                <th>Harga Jual</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(good, index) in allGoods.goods" :key="good._id">
                <td>{{ index + 1 }}</td>
                <td>{{ good.name }}</td>
                <td>{{ good.stock }} {{ good.unit }}</td>
                <td>{{ good.buyPrice }}</td>
                <td>{{ good.sellPrice }}</td>
                <td>
                  <a @click.prevent="editGoods(good._id)">
                    <span class="fas fa-edit text-blue"></span>
                  </a>
                  &nbsp; &nbsp; &nbsp; / &nbsp; &nbsp; &nbsp;
                  <a @click.prevent="deleteGoodsBtn(good._id)">
                    <span class="fas fa-trash-alt text-red"></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="container">
          <div class="float-right mt-4">
            <button id="btn-add-item" class="btn btn-primary">
              Tambahkan Barang
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; //eslint-disable-line no-undef
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
  /*global Swal*/
  /*eslint no-undef: "error"*/
  methods: {
    ...mapActions(["addGoods", "fetchGoods", "deleteGoods"]),
    editGoods(id) {
      console.log(id);
    },
    async deleteGoodsBtn(id) {
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
          this.deleteGoods({ _id: id }).then(() => {
            Swal.fire("Dihapus!", "Data berhasil dihapus.", "success");
          });
        }
      });
    },
    async getGoods() {
      await this.fetchGoods({ month: this.month, year: this.year });
    },
    getMonth() {
      const currentMonthNumber = date.getMonth();
      const currentMonth = months[currentMonthNumber];
      return currentMonth;
    },
    inventoryLoad() {
      const monthsElement = document.getElementById("month-list");
      months.forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        monthsElement.appendChild(option);
      });
    },
  },
  mounted() {
    this.inventoryLoad();
  },
  computed: mapGetters(["allGoods"]),
};
</script>
