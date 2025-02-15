import { parseCSV } from "../utils/csvParser";
import { STAFF_CSV_FILE, STAFF_COLUMN_MAPPING } from "../config";
import { Staff } from "../models/staff";

let staffList: Staff[] | null = null;

async function loadStaffData(): Promise<void> {
    if (!staffList) {
        staffList = await parseCSV<Staff>(STAFF_CSV_FILE, STAFF_COLUMN_MAPPING);
    }
}

export async function lookupStaff(staffPassId: string): Promise<Staff | undefined> {
    await loadStaffData();
    return staffList?.find(staff => staff.staffPassId === staffPassId);
}
