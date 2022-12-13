import { defineStore } from "pinia"

const useAppStore = defineStore("counter", {
    state: () => {
        return {
            activeSource: ""
        }
    }
})

export default useAppStore