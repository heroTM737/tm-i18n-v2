<template>
    <v-snackbar v-model="visible" :color="type">
        {{ message }}
        <template v-slot:actions>
            <v-btn
                color="pink"
                variant="text"
                @click="close"
                icon="mdi-close-circle-outline"
            >
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import utils from "../utils/utils";
import constants from "../utils/constants";

export default {
    name: "ToastMessage",
    data() {
        return {
            visible: false,
            message: "",
            type: ""
        }
    },
    mounted() {
        utils.ToastMessage = this
    },
    methods: {
        close() {
            this.visible = false
        },
        open(message, type = constants.TOAST.INFO) {
            this.visible = true
            this.message = message
            this.type = type
        }
    }
}
</script>

<style scoped>

</style>