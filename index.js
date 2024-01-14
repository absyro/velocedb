const fs = require('fs');
const path = require('path');

module.exports = {
    Veloce: class {
        constructor(filename, config = {}) {
            const directory = path.dirname(filename);

            fs.existsSync(directory) || fs.mkdirSync(directory, { recursive: true });
            fs.existsSync(filename) || fs.writeFileSync(filename, '{}');

            this.filename = filename;
            this.config = Object.assign({ encoding: 'utf-8', space: 2 }, config);
            this.data = JSON.parse(fs.readFileSync(filename, this.config.encoding));
        }

        save() {
            fs.writeFileSync(this.filename, JSON.stringify(this.data, null, this.config.space), { encoding: this.config.encoding });
        }
    }
};