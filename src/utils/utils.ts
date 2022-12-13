import { ipcRenderer } from 'electron'
import fs from 'fs'

export interface PromiseCallbackInterface<T = any, E = any> {
    resolve: (value: T) => void;
    reject: (error: E) => void;
}

export const DefaultPromiseCallback: PromiseCallbackInterface = {
    resolve() {
    },
    reject() {
    }
};

let openFilePromiseCallback: PromiseCallbackInterface<string> = DefaultPromiseCallback

const utils = {
    selectFile(): Promise<string> {
        ipcRenderer.send('open-file', {
            title: 'Select i18n folder'
        })
        return new Promise((resolve, reject) => {
            openFilePromiseCallback = { resolve, reject }
        })
    },
    readFile(filePath: string) {
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8');
        }
        return null
    },
    saveFile(filePath: string, fileContent: string) {
        if (fs.existsSync(filePath)) {
            return fs.writeFileSync(filePath, fileContent)
        }
        return null
    }
}

ipcRenderer.on('open-file-done', (_event, data) => {
    openFilePromiseCallback.resolve(data.filePaths[0])
})

export default utils;