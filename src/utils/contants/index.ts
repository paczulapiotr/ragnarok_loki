export const mobileDeviceWidth = 960;
export const isDeviceMode = () => document.body.clientWidth < mobileDeviceWidth;
export const isDevelopment = process.env.NODE_ENV === "development";
