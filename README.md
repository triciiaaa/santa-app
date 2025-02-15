# 🎅 sanTA: Streamlining Gift Redemption for Teams

sanTA is a **lightweight and efficient** application designed to manage and automate gift redemption processes. By integrating staff verification, team-based eligibility checks, and real-time tracking, sanTA ensures a **smooth and transparent** redemption experience for you while minimising administrative overhead.

## Features

- **Verify Staff Pass IDs:** Ensures only registered employees can participate in the redemption process.
- **Check Team Eligibility:** Confirms that a team has not already redeemed a gift before allowing further redemptions.
- **View Real-time Redemption Data:** Displays up-to-date information on which teams have redeemed their gifts.

## Tech Stacks Used

- Node.js
- TypeScript
- Jest

## Installation and Running the Application

### Prerequisites

- **Node.js** is required.
- **npm** or **yarn** must be installed.
- Ensure all necessary dependencies are installed.
- Set the necessary data configurations in `config.ts`.

### Steps to Run

1. Clone or download the application files to your local machine.
   ```bash
   git clone https://github.com/triciiaaa/santa-app.git
   ```
2. Navigate to the directory containing the files.
   ```bash
   cd path-to-folder/santa-app
   ```
3. Install dependencies.
   ```bash
   npm install # or yarn
   ```
4. Run the application with the following command:
   ```bash
   npx ts-node src/index.ts
   ```

## File Structure

```
santa-app/
│-- data/
│   ├── redemptions.json
│   └── staff-id-to-team-mapping-long.csv
└-- src/
    │-- models/
    │   ├── redemption.ts
    │   └── staff.ts
    │-- services/
    │   ├── redemptionService.ts
    │   └── staffService.ts
    │-- tests/
    │   ├── redemptionService.test.ts
    │   └── staffService.test.ts
    │-- utils/
    │   └── csvParser.ts
    ├── config.ts
    └── index.ts
```

<br>

1. **`redemption.ts`**

   - Defines the structure for gift redemption.
   - Includes fields like team name, redemption timestamp (in epoch milliseconds), and redeemed by.

2. **`staff.ts`**

   - Represents staff members eligible for gift redemption.
   - Includes fields like staff ID, team name and account creation timestamp (in epoch milliseconds).

3. **`redemptionService.ts`**

   - Handles logic for processing gift redemptions.
   - Validates eligibility and updates redemption records in `redemption.json`.

4. **`staffService`**

   - Manages staff data through `staff-id-to-team-mapping-long.csv`, including retrieval and verification.
   - Checks eligibility based on existence of record in staff mapping data.

5. **`cvParser.ts`**

   - Parses CSV file containing staff data.

6. **`index.ts`**

   - Entry point for the application.
   - Initialises necessary services and starts the application.

## Data Storage

### Staff Data

The staff data is stored in a CSV file named `staff-id-to-team-mapping-long.csv` that maps staff IDs to their respective teams.

**Example:**

```
staff_pass_id,team_name,created_at
BOSS_6FDFMJGFV6YM,GRYFFINDOR,1620761965320
MANAGER_P49NK2CS3B5G,GRYFFINDOR,1614784710249
MANAGER_SEK8LLK8R8JL,HUFFLEPUFF,1618869819036
```

### Redemption Data

The redemption records are stored in a JSON file named `redemptions.json`. Each redemption entry contains the following fields:

- `teamName`: The name of the team that redeemed a gift.
- `redeemedAt`: The timestamp (in epoch milliseconds) of when the gift was redeemed.
- `redeemedBy`: The staff ID of the person who redeemed the gift.

**Example:**

```json
[
  {
    "teamName": "GRYFFINDOR",
    "redeemedAt": 1700000000000,
    "redeemedBy": "BOSS_6FDFMJGFV6YM"
  },
  {
    "teamName": "HUFFLEPUFF",
    "redeemedAt": 1700005000000,
    "redeemedBy": "MANAGER_SEK8LLK8R8JL"
  }
]
```

## Running Tests

- To run all tests, navigate to the root directory of the application and execute the following command:
  ```bash
  npm test
  ```

## Assumptions

- **Staff Eligibility**: Only members of the team can perform the gift redemption on behalf of the entire team.
- **Redemption Eligibility**: Each team is allowed to redeem the gift only once.
