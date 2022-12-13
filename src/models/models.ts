export interface RecentItemInterface {
    name: string;
    src: string;
}

export interface ToastMessageInterface {
    open: (message: string, type?: string) => void;
    close: () => void;
}