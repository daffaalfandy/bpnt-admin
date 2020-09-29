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
                <th>Total Barang</th>
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
                <td>{{ good.qty.toLocaleString("id-ID") }} {{ good.unit }}</td>
                <td>
                  {{ good.stock.toLocaleString("id-ID") }} {{ good.unit }}
                </td>
                <td>Rp{{ good.buyPrice.toLocaleString("id-ID") }}</td>
                <td>Rp{{ good.sellPrice.toLocaleString("id-ID") }}</td>
                <td>
                  <a
                    class="btn py-0 my-0 px-0 mx-0"
                    @click.prevent="onDeleteGoods(good._id)"
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
    ...mapActions(["fetchGoods", "deleteGoods"]),
    async onDeleteGoods(id) {
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
  async mounted() {
    this.inventoryLoad();

    if (this.month !== "" && this.year !== "") {
      await this.fetchGoods({ month: this.month, year: this.year });
    } else {
      document.getElementById("btn-add-item").disabled = true;
    }
  },
  computed: mapGetters(["allGoods"]),
};
</script>
