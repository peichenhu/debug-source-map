export const isURL: RegExp = /^((https?):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
export const isURLHTTPS: RegExp = /^(https:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
// 主机环境判断
export const isBrowser: boolean = typeof window !== "undefined";
