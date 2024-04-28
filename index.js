const path = require('node:path');
const fs = require('node:fs');

module.exports = class Veloce {
    constructor(filename, config = {}) {
        const dir = path.dirname(filename);

        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        if (!fs.existsSync(filename)) fs.writeFileSync(filename, '{}');

        this.filename = filename;
        this.config = Object.assign({ encoding: 'utf-8', space: 2 }, config);
        this.data = JSON.parse(fs.readFileSync(filename, this.config.encoding));
    }

    save() {
        fs.writeFileSync(this.filename, JSON.stringify(this.data, null, this.config.space), { encoding: this.config.encoding });
    }

    delete() {
        fs.unlinkSync(this.filename);
    }
};