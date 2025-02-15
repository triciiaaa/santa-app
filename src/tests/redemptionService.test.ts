import fs from "fs";
import { canRedeem, redeemGift } from "../services/redemptionService";
import { REDEMPTIONS_FILE } from "../config";

let originalRedemptions: string = ""; 

/**
 * Sets up the test environment before running any test.
 *
 * - Backs up the existing `redemptions.json` file if it exists.
 * - Resets `redemptions.json` to an empty list to ensure a clean test environment.
 */
beforeEach(() => {
    if (fs.existsSync(REDEMPTIONS_FILE)) {
        originalRedemptions = fs.readFileSync(REDEMPTIONS_FILE, "utf8");
    } else {
        originalRedemptions = "[]";
    }

    fs.writeFileSync(REDEMPTIONS_FILE, "[]"); 
});

/**
 * Restores the original `redemptions.json` file after all tests are complete.
 *
 * This ensures that any test modifications do not persist beyond the test run.
 */
afterEach(() => {
    fs.writeFileSync(REDEMPTIONS_FILE, originalRedemptions);
});

describe("Redemption Service", () => {
    /**
     * Tests whether a team that has not redeemed a gift is eligible for redemption.
     */
    test("Should allow redemption if team hasn't redeemed yet", () => {
        expect(canRedeem("NEW_TEAM")).toBe(true);
    });

    /**
     * Tests the full redemption flow:
     * - Calls `redeemGift()` to redeem the gift.
     * - Verifies that the team is no longer eligible for redemption.
     */
    test("Should not allow redemption if team has already redeemed", () => {
        redeemGift("EXISTING_TEAM", "STAFF_PASS_ID");
        expect(canRedeem("EXISTING_TEAM")).toBe(false);
    });
});
