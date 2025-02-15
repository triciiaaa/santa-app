import fs from "fs";
import { REDEMPTIONS_FILE } from "../config";
import { Redemption } from "../models/redemption";

let redemptions: Redemption[] = [];

/**
 * Loads redemption data from the file system into memory.
 *
 * If the file is missing or corrupted, it initialises an empty redemption list.
 */
try {
    redemptions = JSON.parse(fs.readFileSync(REDEMPTIONS_FILE, "utf8"));
} catch (error) {
    redemptions = [];
}

/**
 * Determines if a team is eligible for gift redemption.
 *
 * A team can redeem a gift only if it has not already redeemed one.
 *
 * @param {string} teamName - The name of the team to check.
 * @returns {boolean} `true` if the team can redeem a gift, otherwise `false`.
 */
export function canRedeem(teamName: string): boolean {
    return !redemptions.some(redemption => redemption.teamName === teamName);
}

/**
 * Records a gift redemption for a team.
 *
 * If the team is eligible, their redemption is recorded and saved to file.
 *
 * @param {string} teamName - The name of the team redeeming the gift.
 * @param {string} staffPassId - The staff pass ID of the individual redeeming on behalf of the team.
 */
export function redeemGift(teamName: string, staffPassId: string): void {
    if (!canRedeem(teamName)) return;

    const redemption: Redemption = {
        teamName: teamName,
        redeemedAt: Date.now(),
        redeemedBy: staffPassId
    };

    redemptions.push(redemption);
    fs.writeFileSync(REDEMPTIONS_FILE, JSON.stringify(redemptions, null, 2));
}

/**
 * Retrieves all recorded redemptions.
 *
 * @returns {Redemption[]} An array of all redemption records.
 */
export function getAllRedemptions(): Redemption[] {
    return redemptions;
}
