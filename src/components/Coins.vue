<template>
  <div>
    <h3> Top Crypto Currency List </h3>
    <div style="float:right; display:inline-flex;">
      <vue-lpage
        :data="coins"
        :page="currentPage"
        :results-per-page="perPage"
      >
        <div slot-scope="{subset, totalPages, isFirstPage, isLastPage}">

          <label> Entries perPage </label>
          <select
            class="dropdown"
            v-model="perPage"
          >
            <option
              v-for=" (option,idx) in entries"
              :value="option"
              :key="idx"
            >{{option}}</option>
          </select>
          <input
            class="input-box"
            :min="1"
            :max="Math.ceil(totalRows/perPage)"
            type="text"
            v-model="currentPage"
          />
          of {{ Math.ceil(totalRows/perPage) }}
          <a
            style="margin:6px;"
            href="javascript:void(0);"
            :disabled="isFirstPage"
            @click="(currentPage>1) ? currentPage-- : currentPage=1"
          >
            <b-icon icon="arrow-left-circle-fill"></b-icon>
          </a>
          <a
            href="javascript:void(0);"
            :disabled="isLastPage"
            @click="(currentPage< Math.ceil(totalRows/perPage) ) ? currentPage++ : currentPage=Math.ceil(totalRows/perPage)"
          >
            <b-icon icon="arrow-right-circle-fill"></b-icon>
          </a>
        </div>
      </vue-lpage>
    </div>
    <b-table
      class="joblist-table"
      show-empty
      :items="coins"
      :fields="fields"
      :current-page="Number.parseInt(currentPage)"
      :per-page="perPage"
    >
      <template v-slot:cell(currencyIcon)="row"><img
          :src="row.item.iconUrl"
          style="width:2em; height:3em;"
        ></template>
      <template v-slot:cell(currencyName)="row">{{row.item.name}}</template>
      <template v-slot:cell(currencySymbol)="row">{{row.item.symbol}}</template>
      <template v-slot:cell(currencyPrice)="row">${{row.item.price}}</template>
      <template v-slot:cell(currencyPriceChange)="row">{{row.item.change}}</template>
    </b-table>
  </div>
</template>

<script>
import VueLpage from "vue-lpage";

export default {
  name: "Coins",
  components: {
    VueLpage,
  },
  data() {
    return {
      coins: [],
      fields: [
        {
          key: "currencyIcon",
          label: "Currency Icon",
        },
        {
          key: "currencyName",
          label: "Currency Name",
        },
        { key: "currencySymbol", label: "Currency Symbol" },
        { key: "currencyPrice", label: "Currency Price" },
        { key: "currencyPriceChange", label: "Currency Price Change" },
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      entries: [10, 25, 50, 100],
      refreshFlag: null,
    };
  },
  created() {
    this.getCoinsFn();
    this.refreshFlag = setInterval(
      function () {
        this.getCoinsFn();
      }.bind(this),
      10000
    );
  },
  beforeDestroy() {
    clearInterval(this.refreshFlag);
  },
  methods: {
    getCoinsFn() {
      this.$store
        .dispatch("getCoinsAction")
        .then((response) => {
          this.coins = response.data.coins;
          this.totalRows = response.data.coins.length;
        })
        .catch((e) => {
          console.log("error --->", e);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-box {
  width: 20%;
}
.dropdown {
  margin: 0px 15px;
  height: 30px;
}
</style>
