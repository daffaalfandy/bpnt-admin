<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <h3 class="card-header pr-5">
        Transaksi Pembelian Barang {{ isOldGood ? "Lama" : "Baru" }}
      </h3>
      <div class="card-body">
        <div class="container-fluid">
          <form @submit.prevent="onSubmit">
            <div class="row mb-4">
              <div class="col-4 my-auto">
                <label for="name">Nama Barang:</label>
              </div>
              <div class="col-8">
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  v-model="good.name"
                  :placeholder="
                    oldGoodReady ? `${good.name}` : 'Masukkan nama barang'
                  "
                  :disabled="oldGoodReady"
                  required
                />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-4 my-auto">
                <label for="stok">Jumlah Barang:</label>
              </div>
              <div class="col-8">
                <input
                  type="number"
                  id="stok"
                  class="form-control"
                  v-model="good.stock"
                  :placeholder="
                    oldGoodReady
                      ? `Stock barang sebelumnya ${currentGood.stock.toLocaleString(
                          'id-ID'
                        )}`
                      : 'Masukkan jumlah barang'
                  "
                  required
                />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-4 my-auto">
                <label for="unit">Unit Barang:</label>
              </div>
              <div class="col-8">
                <input
                  type="text"
                  id="unit"
                  class="form-control"
                  v-model="good.unit"
                  :placeholder="
                    oldGoodReady ? `${good.unit}` : 'Masukkan unit barang'
                  "
                  :disabled="oldGoodReady"
                  required
                />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-4 my-auto">
                <label for="buy-price">Harga Beli:</label>
              </div>
              <div class="col-8">
                <input
                  type="number"
                  id="buy-price"
                  class="form-control"
                  v-model="good.buyPrice"
                  :placeholder="
                    oldGoodReady
                      ? `Harga beli barang sebelumnya ${currentGood.buyPrice.toLocaleString(
                          'id-ID'
                        )}`
                      : 'Masukkan harga beli barang'
                  "
                />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-4 my-auto">
                <label for="sell-price">Harga Jual:</label>
              </div>
              <div class="col-8">
                <input
                  type="number"
                  id="sell-price"
                  class="form-control"
                  v-model="good.sellPrice"
                  :placeholder="
                    oldGoodReady
                      ? `Harga jual barang sebelumnya ${currentGood.sellPrice.toLocaleString(
                          'id-ID'
                        )}`
                      : 'Masukkan harga jual barang'
                  "
                  required
                />
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Beli Barang</button>
          </form>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Transaksi Pembelian
            </h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-6 text-center">
                <button class="btn btn-info" @click.prevent="oldGood">
                  Barang Lama
                </button>
              </div>
              <div class="col-6 text-center">
                <button class="btn btn-success" @click.prevent="newGood">
                  Barang Baru
                </button>
              </div>
            </div>
            <div class="row mt-4" v-if="isOldGood">
              <h5 class="col-4 my-auto">Pilih Barang:</h5>
              <div class="main-form my-auto col-4">
                <select class="form-control" v-model="good._id">
                  <option
                    v-for="good in allGoods.goods"
                    :key="good._id"
                    :value="good._id"
                    >{{ good.name }}</option
                  >
                </select>
              </div>
              <div class="col-4">
                <button
                  class="btn btn-primary px-3"
                  @click.prevent="onClickChoose"
                >
                  Pilih
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script>
/*global  Swal, $*/
/*eslint no-undef: "error"*/
import { mapGetters, mapActions } from "vuex"; //eslint-disable-line no-undef

export default {
  data() {
    return {
      dataReady: false,
      good: {
        _id: "",
        name: "",
        stock: "",
        unit: "",
        buyPrice: "",
        sellPrice: "",
      },
      isOldGood: false,
      oldGoodReady: false,
      currentGood: {},
    };
  },
  methods: {
    ...mapActions(["fetchGoods", "updateGood", "addGoods"]),
    onSubmit() {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Pastikan jika data sudah sesuai.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, beli barang",
      }).then((result) => {
        if (result.isConfirmed) {
          let payload = {
            name: this.good.name,
            unit: this.good.unit,
            stock: this.good.stock,
            buyPrice: this.good.buyPrice,
            sellPrice: this.good.sellPrice,
          };
          if (this.isOldGood) {
            payload._id = this.good._id;

            this.updateGood(payload).then(() => {
              Swal.fire("Terbeli!", "Barang berhasil dibeli.", "success");
              this.$router.push("/purchase");
            });
          } else {
            payload.month = this.monthYear.month;
            payload.year = this.monthYear.year;

            this.addGoods(payload).then(() => {
              Swal.fire("Terbeli!", "Barang berhasil dibeli.", "success");
              this.$router.push("/purchase");
            });
          }
        }
      });
    },
    oldGood() {
      this.fetchGoods({
        month: this.monthYear.month,
        year: this.monthYear.year,
      }).then(() => {
        this.isOldGood = true;
      });
    },
    newGood() {
      this.isOldGood = false;
      this.oldGoodReady = false;
      $("#exampleModal").modal("hide");
    },
    onClickChoose() {
      const index = this.allGoods.goods.findIndex(
        (good) => good._id == this.good._id
      );

      this.good.name = this.allGoods.goods[index].name;
      this.currentGood.stock = this.allGoods.goods[index].stock;
      this.good.unit = this.allGoods.goods[index].unit;
      this.currentGood.buyPrice = this.allGoods.goods[index].buyPrice;
      this.currentGood.sellPrice = this.allGoods.goods[index].sellPrice;

      this.oldGoodReady = true;

      $("#exampleModal").modal("hide");
    },
  },
  mounted() {
    $("#exampleModal").modal("show");
    $("#exampleModal").modal({
      backdrop: "static",
      keyboard: false,
    });
  },
  computed: mapGetters(["monthYear", "allGoods"]),
};
</script>
