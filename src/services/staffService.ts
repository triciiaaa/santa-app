import { parseCSV } from "../utils/csvParser";
import { STAFF_CSV_FILE, STAFF_COLUMN_MAPPING } from "../config";
import { Staff } from "../models/staff";

let staffList: Staff[] | null = null;

/**
 * Loads staff data from a CSV file into memory.
 *
 * This function ensures that staff data is loaded only once to improve performance.
 * It uses `parseCSV` to convert the CSV file into an array of `Staff` objects.
 *
 * @returns {Promise<void>} Resolves when the staff data is loaded.
 */
async function loadStaffData(): Promise<void> {
    if (!staffList) {
        staffList = await parseCSV<Staff>(STAFF_CSV_FILE, STAFF_COLUMN_MAPPING);
    }
}

/**
 * Finds a staff member by their staff pass ID.
 *
 * This function ensures staff data is loaded before performing the search.
 *
 * @param {string} staffPassId - The unique staff pass ID.
 * @returns {Promise<Staff | undefined>} A `Staff` object if found, otherwise `undefined`.
 */
export async function lookupStaff(staffPassId: string): Promise<Staff | undefined> {
    await loadStaffData();
    return staffList?.find(staff => staff.staffPassId === staffPassId);
}
