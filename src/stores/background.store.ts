import { defineStore } from 'pinia'

export enum BackgroundType {
    SOLID,
    GRADIENT,
    IMAGE,
    DYNAMIC
}

interface BackgroundStateInterface {
    type: BackgroundType;
    solidData: any;
    gradientData: any;
    imageData: any;
    dynamicData: any;
}

const useBackgroundStore = defineStore('background-store', {
    state: (): BackgroundStateInterface => {
        return {
            type: BackgroundType.SOLID,
            solidData: {
                color: '#354384'
            },
            gradientData: {},
            imageData: {},
            dynamicData: {}
        }
    },
    actions: {
        setSolidData(data: any) {
            this.solidData = data
        },
        setGradientData(data: any) {
            this.gradientData = data
        },
        setImageData(data: any) {
            this.imageData = data
        },
        setDynamicData(data: any) {
            this.dynamicData = data
        },
    }
})

export default useBackgroundStore