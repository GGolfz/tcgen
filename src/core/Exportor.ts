const fs = require('fs');

export class Exportor {
    static async writeFile(fileName: string, content: string) {
        await fs.writeFileSync(fileName, content);
    }
}