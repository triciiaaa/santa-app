import fs from "fs";
import csvParser from "csv-parser";

export async function parseCSV<T>(filePath: string, columnMapping: { [key: string]: keyof T }): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const results: T[] = [];

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => {
                const transformedRow: Partial<T> = {};

                for (const csvCol in columnMapping) {
                    if (Object.prototype.hasOwnProperty.call(row, csvCol)) {
                        const mappedKey = columnMapping[csvCol] as keyof T; 
                        transformedRow[mappedKey] = row[csvCol] as any; 
                    }
                }

                results.push(transformedRow as T);
            })
            .on("end", () => resolve(results))
            .on("error", (error) => reject(error));
    });
}
