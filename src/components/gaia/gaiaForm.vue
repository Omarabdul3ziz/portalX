<template>
  <div class="text-center">
    <v-dialog v-model="open" width="750" v-on:click:outside="close">
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
import axios from "axios";
export default {
  name: "GaiaForm",
  props: ["open", "close"],

  data: () => {
    return {
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
    async signIn() {
      this.loading = true;

      let userData = {};
      for (let field of this.complianceFields) {
        userData[field.key] = field.value;
      }
      console.log(userData);

      const res = await axios.post(
        "https://hanafy.threefold.io/lib/sign",
        userData
      );

      console.log(res);

      this.loading = false;
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