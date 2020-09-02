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
            />
            <datalist id="month-list"></datalist>
            <label for="year-period">Tahun:</label>
            <input
              list="year-list"
              id="year-period"
              class="form-control"
              style="max-width: 75px"
            />
            <datalist id="year-list"></datalist>
            <button class="btn btn-primary px-4" id="btn-inventory-start">
              Mulai
            </button>
          </div>
        </div>
        <div class="container">
          <table class="main-table">
            <thead>
              <tr>
                <th>Nomor</th>
                <th>Nama Barang</th>
                <th>Stok Barang</th>
                <th>Harga Beli</th>
                <th>Harga Jual</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody></tbody>
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
export default {
  methods: {
    inventoryLoad() {
      const date = new Date();
      const currentMonthNumber = date.getMonth();
      const currentYear = date.getFullYear();

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

      //const years = () => Array.from(length: 5);

      const currentMonth = months[currentMonthNumber];
      document
        .getElementById("month-period")
        .setAttribute("value", currentMonth);
      document.getElementById("year-period").setAttribute("value", currentYear);

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
};
</script>
