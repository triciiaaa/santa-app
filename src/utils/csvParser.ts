import fs from "fs";
import csvParser from "csv-parser";

/**
 * Parses a CSV file and converts its data into an array of objects with mapped keys.
 *
 * This function reads the CSV file asynchronously, maps its columns based on the provided
 * `columnMapping`, and returns an array of objects of type `T`.
 *
 * @template T - The type of the objects returned.
 * @param {string} filePath - The path to the CSV file.
 * @param {{ [key: string]: keyof T }} columnMapping - An object mapping CSV column names to the corresponding object properties.
 * @returns {Promise<T[]>} A promise that resolves to an array of objects of type `T`.
 */
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
