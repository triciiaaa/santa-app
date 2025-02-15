import fs from "fs";
import { REDEMPTIONS_FILE } from "../config";
import { Redemption } from "../models/redemption";

let redemptions: Redemption[] = [];

try {
    redemptions = JSON.parse(fs.readFileSync(REDEMPTIONS_FILE, "utf8"));
} catch (error) {
    redemptions = [];
}

export function canRedeem(teamName: string): boolean {
    return !redemptions.some(redemption => redemption.teamName === teamName);
}

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

export function getAllRedemptions(): Redemption[] {
    return redemptions;
}
