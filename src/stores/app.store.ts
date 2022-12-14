import { defineStore } from 'pinia'
import fs from 'fs'
import constants from '../utils/constants'
import { RecentItemInterface } from '../models/models'
import utils from '../utils/utils'
import jsonFormat from 'json-format'

interface StateInterface {
    activeSource: RecentItemInterface | null;
    activeData: Map<string, any>;
    activeKeyMap: Map<string, any>;
}

const useAppStore = defineStore('counter', {
    state: (): StateInterface => {
        return {
            activeSource: null,
            activeData: new Map<string, any>(),
            activeKeyMap: new Map<string, any>()
        }
    },
    actions: {
        setActiveSource(item: RecentItemInterface) {
            let activeData = new Map<string, any>()
            let activeKeyMap = new Map<string, any>()
            fs.readdirSync(item.src)
                .filter(fileName => fileName.endsWith('json'))
                .map(fileName => {
                    let fileContentString = fs.readFileSync(item.src + constants.PATH_SEPARATOR + fileName, 'utf8')
                    let fileContent = JSON.parse(fileContentString)
                    for (let key in fileContent) {
                        activeKeyMap.set(key, key)
                    }
                    activeData.set(fileName, fileContent)
                })
            this.activeSource = item
            this.activeData = activeData
            this.activeKeyMap = activeKeyMap
        },
        save() {
            let i18nFolder = this.activeSource ? this.activeSource.src : ''
            this.activeData.forEach((languageData, language) => {
                utils.saveFile(
                    i18nFolder + constants.PATH_SEPARATOR + language,
                    jsonFormat(languageData, { type: 'space' })
                )
            })
        }
    }
})

export default useAppStore