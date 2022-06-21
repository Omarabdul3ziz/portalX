<template>
  <div class="text-center">
    <v-dialog
      v-model="$store.getters.isGaiaFormOpen"
      width="750"
      v-on:click:outside="close"
    >
      <v-card>
        <v-card-title class="text-h5"> Compliance Fields </v-card-title>
        <br />
        <v-card-text v-for="field in complianceFields" :key="field.key">
          <v-text-field
            :label="field.label"
            v-model="field.value"
            outlined
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close()"> Cancel </v-btn>
          <v-btn color="blue" text @click="signIn()" :loading="loading">
            Sign In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import axios from "axios";
import { listTwinStore, getTwinVC, setTwinVC } from "../../lib/gaia";
export default {
  name: "GaiaForm",

  data: () => {
    return {
      twinVC: {},
      userData: {},
      isOpen: open,
      complianceFields: [
        {
          label: "Name",
          key: "name",
          value: "",
          required: true,
        },
        {
          label: "Regestration Number",
          key: "registrationNumber",
          value: "",
          required: true,
        },
        {
          label: "Country",
          key: "country",
          value: "",
          required: true,
        },
        {
          label: "Hash of the Terms and Conditions",
          key: "termsHash",
          value: "",
          required: true,
        },
      ],
      loading: false,
    };
  },

  methods: {
    close() {
      this.$store.state.isGaiaFormOpen = false;
    },

    async signIn() {
      this.loading = true;

      // reformat the compliance fields
      for (let field of this.complianceFields) {
        this.userData[field.key] = field.value;
      }

    
      // store the user data in the chain
      await this.set("gaia", JSON.stringify(this.userData), (res) => {
        console.log(res);

        const { status } = res;
        console.log(`Current status is ${status.type}`);
        switch (status.type) {
          case "Ready":
            this.$toasted.show(`Storing Signed Self Description`);
        }

        if (status.isFinalized) {
          console.log(`Signed Self Description stored`);
          this.$toasted.show(`Signed Self Description stored`);

          this.$store.state.signed = false;
          this.loading = false;
          this.close();
        }
      });

      // get your twin VC
      // const res = await axios.post(
      //   "https://hanafy.threefold.io/lib/sign",
      //   this.userData
      // );

      // this.$toasted.show("Signing in your Self Description");
      // console.log(res.data);
      // console.log(JSON.stringify(res.data));
    },

    async list() {
      const api = await this.$store.state.api;
      const address = this.$route.params.accountID;

      const res = await listTwinStore(api, address);
      console.log(res);
    },

    async get() {
      const key = "gaia";
      const api = await this.$store.state.api;
      const address = this.$route.params.accountID;

      const res = await getTwinVC(api, address, key);
      console.log(res);
    },

    async set(key, value, callback) {
      const api = await this.$store.state.api;
      const address = this.$route.params.accountID;

      return setTwinVC(api, address, key, value, callback);
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