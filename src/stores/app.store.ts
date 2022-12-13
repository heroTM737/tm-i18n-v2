import { defineStore } from 'pinia'
import fs from 'fs'
import constants from '../utils/constants';
import { RecentItemInterface } from '../models/models';

interface ActiveDataItemInterface {
    name: string;
    data: any;
}

interface StateInterface {
    activeSource: RecentItemInterface | null;
    activeData: ActiveDataItemInterface[];
}

const useAppStore = defineStore('counter', {
    state: (): StateInterface => {
        return {
            activeSource: null,
            activeData: []
        }
    },
    actions: {
        setActiveSource(item: RecentItemInterface) {
            let activeData: ActiveDataItemInterface[] = []
            fs.readdirSync(item.src)
                .filter(fileName => fileName.endsWith('json'))
                .map(fileName => {
                    let fileContent = fs.readFileSync(item.src + constants.PATH_SEPARATOR + fileName, 'utf8')
                    activeData.push({
                        name: fileName,
                        data: JSON.parse(fileContent)
                    })
                })
            this.activeSource = item
            this.activeData = activeData
        }
    }
})

export default useAppStore