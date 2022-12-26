import { defineStore } from 'pinia'
import constants from '../utils/constants';

export enum BackgroundType {
    SOLID,
    GRADIENT,
    IMAGE,
    DYNAMIC
}

interface BackgroundStateInterface {
    type: BackgroundType;
    solidData: {
        color: string;
    };
    gradientData: {
        angle: number;
        color1: string;
        color2: string;
    };
    imageData: {
        file: File,
        fileUrl: string;
    };
    dynamicData: {
        id: string;
    };
}

const useBackgroundStore = defineStore('background-store', {
    state: (): BackgroundStateInterface => {
        return {
            type: BackgroundType.DYNAMIC,
            solidData: {
                color: '#354384'
            },
            gradientData: {
                angle: 90,
                color1: '#673ab7',
                color2: '#bfc3d9'
            },
            imageData: {
                file: new File([], ''),
                fileUrl: ''
            },
            dynamicData: {
                id: constants.DYNAMIC_ID.WAVE
            }
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