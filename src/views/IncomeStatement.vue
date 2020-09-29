<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <div class="card-header">
        <div class="row">
          <h3 class="col-12 mx-auto text-center">Laporan Laba Rugi</h3>
          <small class="text-center text-secondary col-12 my-auto"
            >*Silahkan gunakan laptop atau komputer untuk menyimpan dalam bentuk
            PDF*</small
          >
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
            <button class="btn btn-primary px-4" @click.prevent="onClickChoose">
              Pilih
            </button>
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
            >
              Lihat Laporan
            </button>
          </div>
          <div class="col-xl-4 col-md-6 export-to-pdf">
            <button
              class="btn btn-success mx-1 px-5"
              @click="onClickSavePDF"
              id="save-pdf-btn"
              disabled
            >
              Simpan ke PDF
            </button>
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
import { agent } from "../../config/config";

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
let globalSum = 0;

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
    ...mapActions(["fetchGoods", "getTransactionBasedOnMonth"]),
    async onClickChoose() {
      if (this.datepick.month && this.datepick.year) {
        await this.fetchGoods({
          month: this.datepick.month,
          year: this.datepick.year,
        });
        await this.getTransactionBasedOnMonth({
          datepick: {
            month: this.datepick.month,
            year: this.datepick.year,
          },
        });

        if (
          this.allGoods.goods.length > 0 &&
          this.transaction.transaction.length > 0
        ) {
          this.dataReady = true;
        } else {
          this.dataReady = false;
        }
      }
    },
    onClickSavePDF() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      pdfMake
        .createPdf(this.createDocDefinition())
        .download(
          `LAPORAN LABA RUGI, ${this.datepick.month.toUpperCase()} ${
            this.datepick.year
          }`
        );

      globalSum = 0;
    },
    onClickWatchPDF() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      pdfMake.createPdf(this.createDocDefinition()).open();

      globalSum = 0;
    },
    createDocDefinition() {
      return {
        pageSize: "A4",
        pageMargins: [40, 60, 40, 60],
        footer: {
          columns: [
            { width: "*", text: "" },
            {
              text: "© 2020, Daffa Alfandy. All rights reserved.",
              italics: true,
              alignment: "center",
              fontSize: 10,
            },
            { width: "*", text: "" },
          ],
        },
        content: [
          {
            text: `LAPORAN LABA RUGI \n ${agent.toUpperCase()}, ${this.datepick.month.toUpperCase()} ${
              this.datepick.year
            }`,
            fontSize: 24,
            bold: true,
            alignment: "center",
            margin: [0, 0, 0, 30],
          },
          {
            text: `Pembelian Komoditi BPNT, ${this.datepick.month} ${this.datepick.year}`,
            fontSize: 14,
            bold: true,
            alignment: "center",
            margin: [0, 0, 0, 5],
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
              text: "JUMLAH BARANG",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "HARGA BELI",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "SUB TOTAL",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
          ]),
          {
            text: "Sisa Stock",
            fontSize: 14,
            bold: true,
            alignment: "center",
            margin: [0, 30, 0, 5],
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
              text: "SISA BARANG",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "HARGA JUAL",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "SUB TOTAL",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
          ]),
          this.kpmTable(this.transaction.transaction),
        ],
      };
    },
    kpmTable(data) {
      return {
        columns: [
          { width: "*", text: "" },
          {
            width: "auto",
            table: {
              headerRows: 3,
              body: this.buildKpmTableBody(data),
            },
          },
          { width: "*", text: "" },
        ],
        margin: [0, 30, 0, 5],
      };
    },
    buildKpmTableBody(data) {
      var body = [];
      let income = 0;
      let result = 0;

      data.forEach((transaction) => {
        income += transaction.overallPrice;
        result = income - globalSum;
      });
      body.push([
        "JUMLAH KPM",
        { text: `${data.length} orang`, alignment: "center" },
      ]);
      body.push([
        "TOTAL UANG MASUK",
        { text: `Rp${income.toLocaleString("id-ID")}`, alignment: "center" },
      ]);
      body.push([
        {
          text: `${result < 0 ? "RUGI" : "UNTUNG"}`,
        },
        {
          text: `${
            result < 0
              ? "Rp" + (result * -1).toLocaleString("id-ID")
              : "Rp" + result.toLocaleString("id-ID")
          }`,
          alignment: "center",
        },
      ]);

      return body;
    },
    table(data, columns) {
      return {
        columns: [
          { width: "*", text: "" },
          {
            width: "auto",
            table: {
              headerRows: 1,
              body: this.buildTableBody(data, columns),
            },
          },
          { width: "*", text: "" },
        ],
      };
    },
    buildTableBody(data, columns) {
      var body = [];
      let tempSum = 0;

      body.push(columns);

      data.forEach((row, index) => {
        var dataRow = [];
        let sum = 0;

        columns.forEach((column) => {
          if (column.text == "NO") {
            dataRow.push({ text: index + 1, alignment: "center" });
          } else if (column.text == "NAMA BARANG") {
            dataRow.push({ text: `${row.name}` });
          } else if (column.text == "JUMLAH BARANG") {
            dataRow.push({
              text: `${row.qty.toLocaleString("id-ID")} ${row.unit}`,
              alignment: "center",
            });

            sum = row.qty * row.buyPrice;
            tempSum += sum;
            globalSum += sum;
          } else if (column.text == "SISA BARANG") {
            dataRow.push({
              text: `${row.stock.toLocaleString("id-ID")} ${row.unit}`,
              alignment: "center",
            });

            sum = row.stock * row.sellPrice;
            tempSum += sum;
          } else if (column.text == "HARGA BELI") {
            dataRow.push({
              text: `Rp${row.buyPrice.toLocaleString("id-ID")}`,
              alignment: "right",
            });
          } else if (column.text == "SUB TOTAL") {
            dataRow.push({
              text: `Rp${sum.toLocaleString("id-ID")}`,
              alignment: "right",
            });
          } else if (column.text == "HARGA JUAL") {
            dataRow.push({
              text: `Rp${row.sellPrice.toLocaleString("id-ID")}`,
              alignment: "right",
            });
          }
        });

        body.push(dataRow);
      });

      //   Set sum
      body.push([
        {
          colSpan: 5,
          text: `TOTAL: \t Rp${tempSum.toLocaleString("id-ID")}`,
          alignment: "right",
          bold: true,
        },
      ]);

      return body;
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
    globalSum = 0;
  },
  watch: {
    dataReady: function() {
      if (this.dataReady) {
        document.getElementById("watch-report-btn").disabled = false;
        document.getElementById("save-pdf-btn").disabled = false;
      } else {
        document.getElementById("watch-report-btn").disabled = true;
        document.getElementById("save-pdf-btn").disabled = true;
      }
    },
  },
  computed: mapGetters(["allGoods", "transaction"]),
};
</script>
