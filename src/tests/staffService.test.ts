import { lookupStaff } from "../services/staffService";
import { STAFF_CSV_FILE, STAFF_COLUMN_MAPPING } from "../config";
import { parseCSV } from "../utils/csvParser";

beforeAll(async () => {
    await parseCSV(STAFF_CSV_FILE, STAFF_COLUMN_MAPPING);
});

describe("Staff Service", () => {
    test("Should return the correct team for a given staff pass ID", async () => {
        const staff = await lookupStaff("BOSS_6FDFMJGFV6YM");
        expect(staff).toBeDefined();
        expect(staff?.teamName).toBe("GRYFFINDOR");
    });

    test("Should return undefined for an invalid staff pass ID", async () => {
        const staff = await lookupStaff("INVALID_ID");
        expect(staff).toBeUndefined();
    });
});
