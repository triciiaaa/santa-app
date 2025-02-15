# sanTA

sanTA is an application designed to manage and conduct gift redemption efficiently. The application allows an admin to:

- Verify staff pass IDs.
- Check team eligibility for gift redemption.
- View real-time redemption data.

**Tech Stacks Used:**

- Node.js
- TypeScript
- Jest

## Installation and Running the Application

### Prerequisites

- **Node.js** is required.
- **npm** or **yarn** must be installed.
- Ensure all necessary dependencies are installed before running the application.

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

## Running Tests

- To run all tests, navigate to the root directory of the application and execute the following command:
  ```bash
  npm test
  ```

## Assumptions

- **Staff Eligibility**: Any member of the team can perform the gift redemption
- **Redemption Eligibility**: Each team is allowed to redeem the gift only once.
