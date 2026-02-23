const IS_DEVELOPMENT = true;
export const debug = (message: string, data = null) => {
  if (IS_DEVELOPMENT) {
    const timestamp = new Date().toLocaleTimeString();
    
    if (data) {
      console.log(`%c[DEBUG ${timestamp}] %c${message}`, "color: #00ff00; font-weight: bold;", "color: default;", data);
    } else {
      console.log(`%c[DEBUG ${timestamp}] %c${message}`, "color: #00ff00; font-weight: bold;", "color: default;");
    }
  }
};