# Cleanup Agent

Remove test data and temporary files from the Expenzez project.

## Phase 1: Analyze - Show What Will Be Cleaned

1. **Find Temporary Files**
   - List all `node_modules/` directories
   - Find build artifacts (`dist/`, `.serverless/`, `.expo/`)
   - Locate cache files (`.cache/`, `.next/`, `.turbo/`)
   - Find log files (`*.log`, `.npm/`, `.yarn/`)
   - Identify test files if any (`*.test.ts`, `*.spec.ts` build outputs)
   - Show `.DS_Store` files (macOS)

2. **Calculate Disk Space**
   - Show size of each directory/file to be removed
   - Display total disk space that will be freed
   - Highlight largest items

3. **Database Test Data** (Optional)
   - Offer to show test users in DynamoDB
   - List transactions with test patterns
   - Do NOT delete database data automatically

## Phase 2: Confirm with User

4. **Show Summary**
   ```
   📊 Cleanup Summary:
   - Frontend node_modules: 450 MB
   - Backend node_modules: 380 MB
   - Build artifacts (dist/): 25 MB
   - Serverless cache: 15 MB
   - Expo cache: 120 MB
   - Log files: 5 MB

   💾 Total to free: ~995 MB

   ⚠️ Safe to remove - will not affect source code
   ```

5. **Get Explicit Confirmation**
   - Ask: "Proceed with cleanup? (yes/no)"
   - List what will be preserved (source code, .env files, configs)
   - Wait for user response

## Phase 3: Clean (Only After Confirmation)

6. **Remove Frontend Temporary Files**
   ```bash
   cd expenzez-frontend
   rm -rf node_modules
   rm -rf .expo
   rm -rf dist
   rm -rf .cache
   rm -rf ios/build
   rm -rf android/build
   rm -rf .next
   find . -name "*.log" -type f -delete
   find . -name ".DS_Store" -type f -delete
   ```

7. **Remove Backend Temporary Files**
   ```bash
   cd expenzez-backend
   rm -rf node_modules
   rm -rf dist
   rm -rf .serverless
   rm -rf .build
   rm -rf coverage
   find . -name "*.log" -type f -delete
   find . -name ".DS_Store" -type f -delete
   ```

8. **Root Directory Cleanup**
   ```bash
   cd /Users/bishalaryal/Documents/Github/expenzez
   rm -rf node_modules
   find . -name ".DS_Store" -type f -delete
   rm -rf .turbo
   rm -rf .cache
   ```

9. **Clean Package Manager Caches** (Optional)
   - Offer to clean npm cache: `npm cache clean --force`
   - Offer to clean yarn cache: `yarn cache clean`
   - Show space freed from cache cleanup

## Phase 4: Optional Database Cleanup

10. **Test User Cleanup** (ONLY if explicitly requested)
    - Ask: "Do you want to clean test users from database? (yes/no)"
    - If yes, show test users (username contains "test", "temp", "demo")
    - Get confirmation for EACH user before deletion
    - Provide rollback instructions

11. **Test Transaction Cleanup** (ONLY if explicitly requested)
    - Find transactions with test patterns
    - Show transaction details
    - Confirm before deletion
    - Delete in batches

## Phase 5: Post-Cleanup

12. **Reinstall Dependencies** (Optional)
    - Ask: "Reinstall node_modules? (yes/no)"
    - If yes:
      ```bash
      cd expenzez-frontend && npm install
      cd ../expenzez-backend && npm install
      ```

13. **Verification**
    - Confirm all temporary files removed
    - Show new disk space
    - Verify project can still build

14. **Summary Report**
    ```
    ✅ Cleanup Complete!

    📁 Removed:
    - 2 node_modules directories (830 MB)
    - Build artifacts (40 MB)
    - Cache files (125 MB)
    - Log files (5 MB)

    💾 Total freed: 1000 MB

    📦 Preserved:
    - All source code
    - Configuration files (.env, tsconfig, etc.)
    - Git repository

    ⚠️ Next Steps:
    - Run `npm install` in frontend and backend if needed
    - Verify builds work: `npm run build:functions`
    ```

## Safety Rules

🛡️ **NEVER Delete**:
- Source code files (`.ts`, `.tsx`, `.js`, `.jsx`)
- Configuration files (`.env`, `tsconfig.json`, `package.json`)
- Git repository (`.git/`)
- Assets (`assets/`, `images/`)
- Documentation (`.md` files, `CLAUDE.md`)
- Database schema files

⚠️ **ALWAYS Confirm Before**:
- Deleting any database records
- Removing package manager global caches
- Cleaning production data

✅ **Safe to Remove**:
- `node_modules/` (can reinstall)
- `dist/`, `.serverless/`, `.expo/` (build artifacts)
- Cache directories
- Log files
- `.DS_Store` files
- Coverage reports

## Example Usage

**Quick Clean (no database)**:
```bash
/cleanup
# Reviews files -> Confirms -> Removes temp files
```

**Deep Clean (with database)**:
```bash
/cleanup
# User responds "yes" to database cleanup option
# Shows test users -> Confirms each -> Deletes
```

## Recovery

If something goes wrong:
```bash
# Reinstall dependencies
npm install

# Rebuild backend
npm run build:functions

# Rebuild frontend
npm start
```

All source code and configurations are preserved, so project can be fully restored with `npm install` and rebuild commands.
