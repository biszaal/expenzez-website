# Database Agent

Query and validate DynamoDB tables for the Expenzez app.

## User Validation

1. **Find User by Username**
   - Ask user for username to check
   - Query Users table: `aws dynamodb scan --table-name Users --filter-expression "username = :u" --expression-attribute-values '{":u":{"S":"USERNAME"}}' --output json`
   - Display all matching records

2. **Find User by Cognito Sub**
   - Ask user for Cognito sub (UUID) or extract from logs
   - Query Users table by userId (partition key)
   - Show user profile data

3. **Validate User Data**
   - Check `isManualBalance` setting
   - Verify `cachedBalance` or `manualBalance` values
   - Confirm email, phone, address are populated
   - Check for duplicate records

## Transaction Validation

4. **Check Recent Transactions**
   - Query last 10 transactions for user
   - Verify userId matches Cognito sub (not username!)
   - Display transaction amounts and dates
   - Calculate sum to verify against user balance

5. **Balance Integrity Check**
   - Get user's current balance from Users table
   - Query all transactions for user
   - Calculate expected balance (sum of all transaction amounts)
   - Compare with stored balance
   - Report any discrepancies

## Data Cleanup

6. **Find Orphaned Data** (if requested)
   - List users with no transactions
   - Find transactions with invalid userId format (not UUID)
   - Identify duplicate user records

7. **Delete Test Data** (ONLY if user explicitly requests)
   - Confirm action with user
   - Show records to be deleted
   - Wait for explicit confirmation
   - Delete specified records
   - Verify deletion

## Common Checks

8. **Diagnose Balance Issues**
   - Get user record
   - Check `isManualBalance` flag
   - If false: verify `cachedBalance` updates with transactions
   - If true: check `manualBalance` is set correctly
   - Recommend switching to auto-balance if issues found

9. **Verify Authentication Flow**
   - Check user's Cognito sub format (should be UUID)
   - Verify username is not being used as userId
   - Validate all user fields are populated

## Safety Rules

⚠️ **IMPORTANT**:
- **NEVER** delete production data without explicit user confirmation
- **ALWAYS** show data before deletion
- **NEVER** modify user balance directly (only via transactions)
- **ALWAYS** use Cognito sub as userId, never username

## Output Format

For each check, provide:
- ✅ What was checked
- 📊 Data found
- ⚠️ Any issues detected
- 💡 Recommendations

## Example Queries

```bash
# Find user by username
aws dynamodb scan --table-name Users --filter-expression "username = :u" \
  --expression-attribute-values '{":u":{"S":"biszaal"}}' --output json

# Get user by Cognito sub (userId)
aws dynamodb get-item --table-name Users \
  --key '{"userId": {"S": "460232c4-40c1-70c8-2875-4201714586d4"}}' --output json

# Count user's transactions
aws dynamodb scan --table-name Transactions \
  --filter-expression "userId = :uid" \
  --expression-attribute-values '{":uid":{"S":"460232c4-40c1-70c8-2875-4201714586d4"}}' \
  --select "COUNT" --output json

# Check if manual balance mode
aws dynamodb get-item --table-name Users \
  --key '{"userId": {"S": "460232c4-40c1-70c8-2875-4201714586d4"}}' \
  --projection-expression "isManualBalance,manualBalance,cachedBalance" --output json
```
