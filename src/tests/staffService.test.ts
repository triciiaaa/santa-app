import { lookupStaff } from "../services/staffService";
import { STAFF_CSV_FILE, STAFF_COLUMN_MAPPING } from "../config";
import { parseCSV } from "../utils/csvParser";

/**
 * Loads staff data from the CSV file before running any tests.
 *
 * Ensures that `lookupStaff()` has access to valid data for test cases.
 */
beforeAll(async () => {
    await parseCSV(STAFF_CSV_FILE, STAFF_COLUMN_MAPPING);
});

describe("Staff Service", () => {
    /**
     * Tests whether `lookupStaff()` correctly retrieves a staff member's details
     * based on their staff pass ID.
     *
     * - The function should return a valid `Staff` object if the ID exists in the data.
     * - The returned staff should have the expected `teamName`.
     */
    test("Should return the correct team for a given staff pass ID", async () => {
        const staff = await lookupStaff("BOSS_6FDFMJGFV6YM");
        expect(staff).toBeDefined();
        expect(staff?.teamName).toBe("GRYFFINDOR");
    });

    /**
     * Tests whether `lookupStaff()` returns `undefined` when an invalid staff pass ID is provided.
     *
     * - If a staff pass ID does not exist in the data, the function should return `undefined`.
     */
    test("Should return undefined for an invalid staff pass ID", async () => {
        const staff = await lookupStaff("INVALID_ID");
        expect(staff).toBeUndefined();
    });
});
