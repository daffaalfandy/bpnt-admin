<template>
  <tr>
    <td>{{index + 1}}</td>
    <td>{{good.name}}</td>
    <td>{{good.stock.toLocaleString('id-ID')}} {{good.unit}}</td>
    <td>Rp{{good.sellPrice.toLocaleString('id-ID')}}</td>
    <td>
      <div class="number-spinner">
        <span class="ns-btn">
          <a data-dir="dwn" @click.prevent="btnMinus">
            <span class="icon-minus"></span>
          </a>
        </span>
        <input type="number" class="pl-ns-value" v-model="buyQty" maxlength="2" disabled />
        <span class="ns-btn">
          <a data-dir="up" @click.prevent="btnPlus">
            <span class="icon-plus"></span>
          </a>
        </span>
      </div>
    </td>
    <td class="text-right">Rp{{sumOfPrice.toLocaleString('id-ID')}}</td>
  </tr>
</template>

<script>
import { mapMutations } from "vuex"; //eslint-disable-line no-undef
/*global EventBus */
/*eslint no-undef: "error"*/
export default {
  data() {
    return {
      buyQty: 0,
      sumOfPrice: 0,
    };
  },
  props: {
    good: Object,
    index: Number,
  },
  methods: {
    ...mapMutations(["updateCart"]),
    btnMinus() {
      if (this.buyQty > 0) {
        this.buyQty--;
        EventBus.$emit("change-value");
        this.$emit("changeSumValue", -this.good.sellPrice);
      }
    },
    btnPlus() {
      if (this.buyQty < this.good.stock) {
        this.buyQty++;
        EventBus.$emit("change-value");
        this.$emit("changeSumValue", this.good.sellPrice);
      }
    },
    onChangeValue: function () {
      this.sumOfPrice = Number(this.buyQty) * this.good.sellPrice;
    },
  },
  mounted() {
    EventBus.$on("change-value", () => {
      this.onChangeValue();
    });

    EventBus.$on("checkout-clicked", () => {
      if (this.buyQty > 0) {
        let payload = {
          itemId: this.good._id,
          name: this.good.name,
          qty: this.buyQty,
          sumOfPrice: Number(this.buyQty) * this.good.sellPrice,
        };
        this.updateCart(payload);
      }
    });
  },
  beforeDestroy() {
    EventBus.$off("checkout-clicked", this.listener);
  },
};
</script>