<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <div class="card-header">
        <div class="row">
          <h3 class="col-12 mx-auto text-center">Laporan Akhir</h3>
          <small
            class="text-center text-secondary col-12 my-auto"
          >*Silahkan gunakan laptop atau komputer untuk menyimpan dalam bentuk PDF*</small>
        </div>
      </div>
      <div class="card-body my-auto">
        <div class="container">
          <div class="main-form">
            <label for="month-period">Bulan:</label>
            <input
              list="month-list"
              id="month-period"
              class="form-control"
              style="max-width: 150px"
              v-model="datepick.month"
            />
            <datalist id="month-list"></datalist>
            <label for="year-period">Tahun:</label>
            <input
              list="year-list"
              id="year-period"
              class="form-control"
              style="max-width: 75px"
              v-model="datepick.year"
            />
            <datalist id="year-list"></datalist>
            <button class="btn btn-primary px-4" @click.prevent="onClickChoose">Pilih</button>
          </div>
        </div>
        <div class="container mb-5 mt-5 row mx-auto">
          <div class="col-xl-2"></div>
          <div class="col-xl-4 col-md-6 mx-auto">
            <button
              class="btn btn-info mx-1 px-5"
              @click="onClickWatchPDF"
              id="watch-report-btn"
              disabled
            >Lihat Laporan</button>
          </div>
          <div class="col-xl-4 col-md-6 export-to-pdf">
            <button
              class="btn btn-success mx-1 px-5"
              @click="onClickSavePDF"
              id="save-pdf-btn"
              disabled
            >Simpan ke PDF</button>
          </div>
          <div class="col-xl-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*global pdfMake, pdfFonts*/
/*eslint no-undef: "error"*/
import { mapActions, mapGetters } from "vuex";

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
      datepick: {
        month: this.getMonth(),
        year: date.getFullYear().toString(),
      },
      dataReady: false,
    };
  },
  methods: {
    ...mapActions(["fetchGoods"]),
    onClickSavePDF() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
    },
    onClickWatchPDF() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      let docDefinition = {
        pageSize: "A4",
        pageMargins: [40, 60, 40, 60],
        content: [
          {
            text: `LAPORAN PROGRAM\n BANTUAN PANGAN NON TUNAI \n`,
            fontSize: 24,
            bold: true,
            alignment: "center",
          },
          {
            text: `${this.datepick.month}, ${this.datepick.year}`,
            fontSize: 18,
            alignment: "center",
            margin: [0, 0, 0, 30],
          },
          this.table(this.allGoods.goods, [
            {
              text: "NO",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "NAMA BARANG",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "TERJUAL",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
          ]),
        ],
      };

      pdfMake.createPdf(docDefinition).open();
    },
    table(data, columns) {
      return {
        widths: ["*", "auto", 100, "*"],
        alignment: "center",
        table: {
          headerRows: 1,
          body: this.buildTableBody(data, columns),
        },
      };
    },
    buildTableBody(data, columns) {
      var body = [];

      body.push(columns);

      data.forEach((row, index) => {
        var dataRow = [];

        columns.forEach((column) => {
          if (column.text == "NO") {
            dataRow.push({ text: index + 1 });
          } else if (column.text == "NAMA BARANG") {
            dataRow.push({ text: `${row.name}` });
          } else if (column.text == "TERJUAL") {
            dataRow.push({
              text: `${(row.qty - row.stock).toLocaleString("id-ID")} ${
                row.unit
              }`,
            });
          }
        });

        body.push(dataRow);
      });

      return body;
    },
    async onClickChoose() {
      if (this.datepick.month && this.datepick.year) {
        await this.fetchGoods({
          month: this.datepick.month,
          year: this.datepick.year,
        });

        if (this.allGoods.goods.length > 0) {
          this.dataReady = true;
        } else {
          this.dataReady = false;
        }
      }
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
  computed: mapGetters(["allGoods"]),
  watch: {
    dataReady: function () {
      if (this.dataReady) {
        document.getElementById("watch-report-btn").disabled = false;
        document.getElementById("save-pdf-btn").disabled = false;
      } else {
        document.getElementById("watch-report-btn").disabled = true;
        document.getElementById("save-pdf-btn").disabled = true;
      }
    },
  },
  mounted() {
    this.inventoryLoad();
  },
};
</script>