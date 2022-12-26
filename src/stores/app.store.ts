import { defineStore } from 'pinia'
import fs from 'fs'
import constants from '../utils/constants'
import { RecentItemInterface } from '../models/models'
import utils from '../utils/utils'
// @ts-ignore
import jsonFormat from 'json-format'

interface AppStateInterface {
    loading: boolean;
    activeSource: RecentItemInterface | null;
    activeData: Map<string, any>;
    activeKeyMap: Map<string, any>;
    activeKey: string;
    visibleEditorContent: boolean;
    keyClone: string;
    count: number;
}

const useAppStore = defineStore('app-store', {
    state: (): AppStateInterface => {
        return {
            loading: false,
            activeSource: null,
            activeData: new Map<string, any>(),
            activeKeyMap: new Map<string, any>(),
            activeKey: '',
            visibleEditorContent: false,
            keyClone: '',
            count: 0
        }
    },
    actions: {
        setActiveSource(item: RecentItemInterface) {
            this.loading = true
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    fs.readdir(item.src, null, (errors, fileList) => {
                        let activeData = new Map<string, any>()
                        let activeKeyMap = new Map<string, any>()
                        if (errors) {
                            this.loading = false;
                            reject(errors);
                            return;
                        }
                        fileList
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
                        this.visibleEditorContent = false
                        resolve(fileList)
                        setTimeout(() => {
                            this.loading = false
                        }, 500)
                    })
                })
            })
        },
        openEditorContent(key: string, keyClone: string = '') {
            this.activeKey = key;
            this.visibleEditorContent = true
            this.keyClone = keyClone
            this.count = (this.count + 1) % 3
        },
        closeEditorContent() {
            this.visibleEditorContent = false
        },
        save() {
            let i18nFolder = this.activeSource ? this.activeSource.src : ''
            this.activeData.forEach((languageData, language) => {
                let keyList = Object.keys(languageData).sort((a, b) => a.localeCompare(b));
                let sortedData: any = {};
                keyList.forEach(key => {
                    sortedData[key] = languageData[key]
                })
                utils.writeFile(
                    i18nFolder + constants.PATH_SEPARATOR + language,
                    jsonFormat(sortedData, { type: 'space' })
                )
            })
            if (this.activeSource) {
                this.setActiveSource(this.activeSource)
            }
        },
        deleteKey(key: string) {
            this.activeData.forEach((languageData, language) => {
                delete languageData[key];
            })
            this.save()
        }
    }
})

export default useAppStore