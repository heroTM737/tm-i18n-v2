import { ipcRenderer } from 'electron'
import fs from 'fs'
import { ToastMessageInterface } from '../models/models';
import constants from './constants';

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
const pathSeparator = constants.PATH_SEPARATOR
const ToastMessage: ToastMessageInterface | null = null

const utils = {
    ToastMessage,
    selectFileOrDirectory(): Promise<string> {
        ipcRenderer.send('open-file-directory', {
            title: 'Select i18n folder',
            properties: ['openFile', 'openDirectory']
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
        return fs.writeFileSync(filePath, fileContent)
    },
    findI18nFile(path: string): string | null {
        let isDirectory = fs.lstatSync(path).isDirectory()
        if (isDirectory) {
            let dirName = utils.getItemNameFromPath(path)
            let ignoreDir = ['node_modules']
            if (dirName.startsWith('.') || ignoreDir.includes(dirName)) {
                return null
            }
            let children = fs.readdirSync(path)
            for (let child of children) {
                let found = utils.findI18nFile(path + pathSeparator + child)
                if (found) {
                    return found
                }
            }
        } else {
            if (
                path.endsWith('json') &&
                path.includes('i18n')
            ) {
                return path
            }
        }
        return null
    },
    getItemNameFromPath(path: string) {
        let split = path.split(pathSeparator)
        return split[split.length - 1]
    },
    toast(message: string, type: string) {
        (utils.ToastMessage as any)?.open(message, type)
    }
}

ipcRenderer.on('open-file-directory-done', (_event, data) => {
    if (data.filePaths.length > 0) {
        openFilePromiseCallback.resolve(data.filePaths[0])
    } else {
        openFilePromiseCallback.reject('cancelled')
    }
})

export default utils;