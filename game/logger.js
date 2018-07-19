class Logger {
    constructor(prefix) {
        this.prefix = prefix;
        this.console = window.console;
    }

    info(message) {    
        this.console.info("%c" + this.prefix + "%c%s", "color: blue", "color: black", message);
    }

    warn(message) {
        this.console.warn("%c" + this.prefix + "%c%s", "color: blue", "color: orange", message);
    }

    error(message) {
        this.console.error(message);
    }

    log(message) {
        this.info(message);
    }
}

export default Logger;