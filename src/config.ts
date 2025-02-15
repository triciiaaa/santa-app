import { Staff } from "./models/staff";

export const STAFF_CSV_FILE = "./data/staff-id-to-team-mapping-long.csv";
export const REDEMPTIONS_FILE = "./data/redemptions.json";
export const STAFF_COLUMN_MAPPING: { [key: string]: keyof Staff } = {
    "staff_pass_id": "staffPassId",
    "team_name": "teamName",
    "created_at": "createdAt"
};
