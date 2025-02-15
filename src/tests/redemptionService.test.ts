import fs from "fs";
import { canRedeem, redeemGift } from "../services/redemptionService";
import { REDEMPTIONS_FILE } from "../config";

let originalRedemptions: string = ""; 

beforeEach(() => {
    if (fs.existsSync(REDEMPTIONS_FILE)) {
        originalRedemptions = fs.readFileSync(REDEMPTIONS_FILE, "utf8");
    } else {
        originalRedemptions = "[]";
    }

    fs.writeFileSync(REDEMPTIONS_FILE, "[]"); 
});

afterEach(() => {
    fs.writeFileSync(REDEMPTIONS_FILE, originalRedemptions);
});

describe("Redemption Service", () => {
    test("Should allow redemption if team hasn't redeemed yet", () => {
        expect(canRedeem("NEW_TEAM")).toBe(true);
    });

    test("Should not allow redemption if team has already redeemed", () => {
        redeemGift("EXISTING_TEAM", "STAFF_PASS_ID");
        expect(canRedeem("EXISTING_TEAM")).toBe(false);
    });
});
