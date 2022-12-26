import { defineStore } from 'pinia'
import constants from '../utils/constants';
import utils from '../utils/utils';
import fs from 'fs';

export enum BackgroundType {
    SOLID = 'SOLID',
    GRADIENT = 'GRADIENT',
    IMAGE = 'IMAGE',
    DYNAMIC = 'DYNAMIC'
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
        fileUrl: string;
        filePath: string;
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
                fileUrl: '',
                filePath: ''
            },
            dynamicData: {
                id: constants.DYNAMIC_ID.WAVE
            }
        }
    },
    actions: {
        readUserSetting() {
            let text = utils.readFile(constants.settingPath)
            if (text) {
                let setting = JSON.parse(text)
                let background = setting.background
                this.type = background.type
                this.solidData = background.solidData
                this.gradientData = background.gradientData
                this.dynamicData = background.dynamicData
                let filePath = `user\\images\\${background.imageData.filePath}`
                if (fs.existsSync(filePath)) {
                    this.imageData = {
                        filePath: background.imageData.filePath,
                        fileUrl: utils.readImage(filePath)
                    }
                }
            }
        }
    }
})

export default useBackgroundStore