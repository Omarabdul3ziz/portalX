import { web3FromAddress } from "@polkadot/extension-dapp";
import axios from "axios";

export async function listTwinStore(api, address) {
    const res = await api.query.tfkvStore.tFKVStore.keys(address);

    const keys = [];
    for (const key of res) {
        keys.push(key.toHuman()[1]);
    }
    return keys;
}

export async function getTwinVC(api, address, key) {

    const res = await api.query.tfkvStore.tFKVStore(address, key);
    const value = String.fromCharCode.apply(null, res);

    return value
}

export async function setTwinVC(api, address, key, value, callback) {
    const injector = await web3FromAddress(address);
    console.log(value)

    return api.tx.tfkvStore
        .set(key, value)
        .signAndSend(address, { signer: injector.signer }, callback);
}

export async function signIn(userData) {
    const res = await axios.post(
        "https://hanafy.threefold.io/lib/sign",
        userData
    );
    return res.data
}