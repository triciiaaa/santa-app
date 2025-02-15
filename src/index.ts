import readline from "readline";
import { lookupStaff } from "./services/staffService";
import { canRedeem, redeemGift, getAllRedemptions } from "./services/redemptionService";
import Table from "cli-table3";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Displays a visual divider for better readability.
 */
function showDivider() {
    console.log("\n------------------------------------------------------------------------------------------------");
}

/**
 * Greets the user and introduces the sanTA application.
 */
function greetUser() {
    console.log("\nWelcome to sanTA! 🎅🎄🎁")
    showDivider();
}

/**
 * Displays the main menu and prompts the user for input.
 */
function showMenu() {
    console.log("\nSelect an option:");
    console.log("1) Verify Staff Pass ID & Check Gift Redemption Eligibility");
    console.log("2) View Existing Gift Redemptions");
    console.log("3) Exit");
    rl.question("\nEnter your choice: ", handleMenuSelection);
}

/**
 * Handles user menu selection and directs to the appropriate function.
 * 
 * @param {string} choice - The user's menu selection.
 */
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

/**
 * Prompts the user to enter a Staff Pass ID and checks if the staff can be found in the staff data. 
 * Retrieves the team that the staff belongs to and checks if the team is eligible for gift redemption.
 */
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

/**
 * Asks the user to confirm gift redemption and processes their response.
 * 
 * @param {string} teamName - The team name of the staff member.
 * @param {string} staffPassId - The staff pass ID of the person redeeming the gift.
 */
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

/**
 * Displays all redeemed gifts in a table format.
 */
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

/**
 * Closes the program and exits the application.
 */
function exitProgram() {
    console.log("\n👋 Exiting sanTA... Goodbye!");
    rl.close();
}

/**
 * Initialises the application by greeting the user and showing the main menu.
 */
function main() {
    greetUser();
    showMenu();
}

// Start the application
main()
