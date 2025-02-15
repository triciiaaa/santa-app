import readline from "readline";
import { lookupStaff } from "./services/staffService";
import { canRedeem, redeemGift, getAllRedemptions } from "./services/redemptionService";
import Table from "cli-table3";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showDivider() {
    console.log("\n------------------------------------------------------------------------------------------------");
}

function greetUser() {
    console.log("\nWelcome to sanTA! 🎅🎄🎁")
    showDivider();
}


function showMenu() {
    console.log("\nSelect an option:");
    console.log("1) Verify Staff Pass ID & Check Gift Redemption Eligibility");
    console.log("2) View Existing Gift Redemptions");
    console.log("3) Exit");
    rl.question("\nEnter your choice: ", handleMenuSelection);
}

async function handleMenuSelection(choice: string) {
    choice = choice.trim();

    switch (choice) {
        case "1":
            await verifyStaffPass();
            break;
        case "2":
            viewRedemptions();
            break;
        case "3":
            exitProgram();
            break;
        default:
            console.log("\n❌ Invalid choice. Please select a valid option.");
            showDivider();
            showMenu();
    }
}

async function verifyStaffPass() {
    rl.question("Enter Staff Pass ID: ", async (staffPassId) => {
        const staff = await lookupStaff(staffPassId);

        if (!staff) {
            console.log("\n❌ Staff not found.");
            showDivider();
            return showMenu();
        }

        console.log(`\n✅ Staff belongs to team: ${staff.teamName}`);

        if (canRedeem(staff.teamName)) {
            console.log(`\n✅ Team ${staff.teamName} is eligible for gift redemption.`);
            showDivider();
            askRedemptionConfirmation(staff.teamName, staff.staffPassId);
        } else {
            console.log(`\n❌ Team ${staff.teamName} has already redeemed their gift.`);
            showDivider();
            showMenu();
        }
    });
}

function askRedemptionConfirmation(teamName: string, staffPassId: string) {
    rl.question("\nProceed with gift redemption (Y/N): ", (answer) => {
        answer = answer.trim().toUpperCase();

        if (answer === "Y") {
            redeemGift(teamName, staffPassId);
            console.log(`\n🎁 Gift redeemed successfully for team ${teamName}!`);
            showDivider();
            showMenu();
        } else if (answer === "N") {
            console.log("\n😔 Gift redemption has been cancelled.");
            showDivider();
            showMenu();
        } else {
            console.log("\n❌ Invalid input. Please enter 'Y' or 'N'.");
            showDivider();
            askRedemptionConfirmation(teamName, staffPassId);
        }
    });
}

function viewRedemptions() {
    const redemptions = getAllRedemptions();

    if (redemptions.length === 0) {
        console.log("\n📭 No gift redemptions have been made yet.");
    } else {
        console.log("\n🎁 Redeemed Gifts:");

        const table = new Table({
            head: ["#", "Team Name", "Redeemed At", "Redeemed By"],
            wordWrap: true,
        });

        redemptions.forEach((redemption, index) => {
            table.push([
                index + 1,
                redemption.teamName,
                new Date(redemption.redeemedAt).toLocaleString(),
                redemption.redeemedBy
            ]);
        });

        console.log(table.toString()); 
    }

    showDivider();
    showMenu();
}

function exitProgram() {
    console.log("\n👋 Exiting sanTA... Goodbye!");
    rl.close();
}

function main() {
    greetUser();
    showMenu();
}

main()
