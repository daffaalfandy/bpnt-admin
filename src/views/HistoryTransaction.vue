<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <div class="card-header pr-5">
        <div class="row">
          <div class="col-lg-10 col-12 mx-auto">
            <div class="row">
              <h3 class="text-center col-12 my-auto">
                Riwayat Transaksi Penjualan / Form Kontrol
              </h3>
              <small class="text-center text-secondary col-12 my-auto">
                *Silahkan gunakan laptop atau komputer untuk menyimpan dalam
                bentuk PDF*
              </small>
            </div>
          </div>
          <button
            @click="onClickMakePDF"
            class="btn btn-info col-2 export-to-pdf"
            disabled
            id="btn-pdf"
          >
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
            >
              Berdasarkan Tanggal
            </button>
            <button
              class="btn btn-primary"
              style="font-size: 0.9em"
              @click.prevent="onClickMonth"
            >
              Berdasarkan Bulan
            </button>
          </div>
        </div>
        <div class="container">
          <small class="text-left text-secondary my-auto">
            *Silahkan simpan dalam bentuk PDF untuk detail lebih lengkap*
          </small>
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
              <tr
                v-for="(transaction, index) in pageOfItems"
                :key="transaction._id"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ formatKks(transaction.kpm.kks) }}</td>
                <td>
                  {{ transaction.datepick.date }},
                  {{ transaction.datepick.month }}
                  {{ transaction.datepick.year }}
                </td>
                <td>{{ loopsItems(transaction.items) }}</td>
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
/*global pdfMake, pdfFonts*/
/*eslint no-undef: "error"*/
import { kks1, kks2, agent, address } from "../../config/config";
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
    onClickMakePDF() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      let docDefinition = {
        pageOrientation: "landscape",
        pageSize: "A4",
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
            text: "FORM KONTROL PROGRAM SEMBAKO",
            style: "header",
            alignment: "center",
            bold: true,
            margin: [0, 0, 0, 10],
          },
          {
            text: [
              `NAMA TOKO   \t\t\t\t: ${agent} \n`,
              `ALAMAT          \t\t\t\t: ${address} \n`,
              `BULAN         \t\t\t\t\t: ${this.datepick.month.toUpperCase()} ${
                this.datepick.year
              }`,
            ],
            preserveLeadingSpace: true,
            style: "header",
            bold: false,
            margin: [0, 0, 0, 8],
          },
          this.table(this.allItems, [
            {
              text: "NO",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "TANGGAL",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "NAMA",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "RT",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "DUSUN",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "DESA",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "KECAMATAN",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "NO. KKS",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
            {
              text: "JENIS KOMODITI",
              style: "tableHeader",
              alignment: "center",
              bold: true,
            },
          ]),
        ],
      };

      pdfMake
        .createPdf(docDefinition)
        .download(
          `FORM KONTROL ${agent}, ${this.datepick.month} ${this.datepick.year}`
        );
    },
    buildTableBody(data, columns) {
      var body = [];

      body.push(columns);

      data.forEach((row, index) => {
        var dataRow = [];

        columns.forEach((column) => {
          if (column.text == "NO") {
            dataRow.push({ text: index + 1, fontSize: 10 });
          } else if (column.text == "TANGGAL") {
            dataRow.push({
              text: `${row.datepick.date}, ${row.datepick.month}`,
              fontSize: 10,
            });
          } else if (column.text == "NAMA") {
            dataRow.push({ text: row.kpm.name, fontSize: 10 });
          } else if (column.text == "RT") {
            dataRow.push({ text: row.kpm.rt, fontSize: 10 });
          } else if (column.text == "DUSUN") {
            dataRow.push({ text: row.kpm.hamlet, fontSize: 10 });
          } else if (column.text == "DESA") {
            dataRow.push({ text: row.kpm.village, fontSize: 10 });
          } else if (column.text == "KECAMATAN") {
            dataRow.push({ text: row.kpm.subDistrict, fontSize: 10 });
          } else if (column.text == "NO. KKS") {
            dataRow.push({ text: this.formatKks(row.kpm.kks), fontSize: 10 });
          } else if (column.text == "JENIS KOMODITI") {
            dataRow.push({ text: this.loopsItems(row.items), fontSize: 10 });
          }
        });
        body.push(dataRow);
      });

      return body;
    },
    table(data, columns) {
      return {
        table: {
          headerRows: 1,
          body: this.buildTableBody(data, columns),
        },
      };
    },
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
  watch: {
    allItems: function () {
      if (this.allItems.length > 0) {
        document.getElementById("btn-pdf").disabled = false;
      } else {
        document.getElementById("btn-pdf").disabled = true;
      }
    },
  },
};
</script>
