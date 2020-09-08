<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <h3
        class="card-header text-center"
        id="month-year"
      >Transaksi BPNT, {{datepick.date}} {{datepick.month}} {{datepick.year}}</h3>
      <div class="card-body">
        <div class="container">
          <span class="h5">Nama: {{getKpm.kpm.name}} || No. KKS: {{formatKks(getKpm.kpm.kks)}}</span>
          <table class="main-table mt-4">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Stok Barang</th>
                <th>Harga Barang</th>
                <th>Jumlah Beli</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(good, index) in allGoods.goods">
                <transaction-list
                  :key="good._id"
                  :index="index"
                  :good="good"
                  v-on:changeSumValue="onSumChange"
                ></transaction-list>
              </template>
            </tbody>
            <tfoot
              style="border-top-style: solid; border-top-width: 2.5px; border-top-color:  rgba(128, 128, 128, 0.1);"
            >
              <tr>
                <td colspan="5" class="text-right">Total Harga:</td>
                <td class="text-left">Rp{{sumOfPrice.toLocaleString('id-ID')}}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="container">
          <button class="btn btn-primary float-right px-4 mt-2" @click.prevent="onBuyClicked">Beli</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*global Swal, EventBus*/
/*eslint no-undef: "error"*/
import { mapGetters, mapActions, mapMutations } from "vuex";
import TransactionList from "../components/TransactionList";

export default {
  components: {
    "transaction-list": TransactionList,
  },
  data() {
    return {
      sumOfPrice: 0,
    };
  },
  methods: {
    ...mapActions(["newTransaction"]),
    ...mapMutations(["emptyCart"]),
    onSumChange(value) {
      this.sumOfPrice += value;
    },
    onBuyClicked() {
      Swal.fire({
        title: "Selesaikan pembelian?",
        text: "Anda tidak bisa merubah setelah ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#979A9C",
        confirmButtonText: "Selesai",
        cancelButtonText: "Lanjutkan Belanja",
      }).then((result) => {
        if (result.value) {
          EventBus.$emit("checkout-clicked");
          let payload = {
            kpm: this.getKpm.kpm,
            datepick: {
              date: this.datepick.date,
              month: this.datepick.month,
              year: this.datepick.year,
            },
            items: this.cart,
            overallPrice: this.sumOfPrice,
          };

          this.newTransaction(payload).then(() => {
            this.emptyCart();
            Swal.fire("Sukses!", "Transaksi selesai", "success");
            this.$router.push({ path: "/" });
          });
        }
      });
    },
  },
  mounted() {},
  computed: mapGetters(["datepick", "getKpm", "allGoods", "cart"]),
};
</script>