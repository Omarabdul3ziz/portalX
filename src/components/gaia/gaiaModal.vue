<template>
  <div class="text-center">
    <v-dialog
      v-model="$store.getters.isGaiaModalOpen"
      width="750"
      v-on:click:outside="close"
    >
      <v-card :loading="loading">
        <v-card-title class="text-h5"> Your Compliance </v-card-title>
        <br />

        <v-divider></v-divider>

        <pre>
  {{ twinVC }}
</pre
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close()"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { getTwinVC } from "../../lib/gaia";

export default {
  props: ["twinData"],
  name: "GaiaVC",

  data: () => {
    return {
      twinVC: {},
      loading: false,
    };
  },

  async mounted() {
    await this.signIn();
  },

  methods: {
    close() {
      this.$store.state.isGaiaModalOpen = false;
    },

    async signIn() {
      this.loading = true;


      getTwinVC(
        this.$store.state.api,
        this.$route.params.accountID,
        "gaia"
      ).then((response) => {
        console.log("response from server");
        console.log(response); // convert to json


        // get your twin VC
        axios
          .post("https://hanafy.threefold.io/lib/sign", JSON.parse(response))
          .then((res) => {
            console.log(res);
            this.twinVC = res.data;
            this.loading = false;
          });
      });
    },
  },
};
</script>
<style scoped>
.v-main {
  background-color: rgb(236, 236, 236) !important;
}
.v-card {
  background: #252c48 !important;
}
</style>