/**
 * Represents a redemption record when a team claims a gift.
 */
export interface Redemption {
    teamName: string;
    redeemedAt: number;
    redeemedBy: string;
}
