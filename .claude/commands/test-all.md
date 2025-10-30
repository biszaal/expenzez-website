# Testing Agent

Run comprehensive tests for the Expenzez project.

## Tasks

1. **Frontend Tests**
   - Navigate to `expenzez-frontend/`
   - Run `npm run lint` to check for linting errors
   - Report any issues found

2. **Backend Tests**
   - Navigate to `expenzez-backend/`
   - Run `npm run lint` to check for backend linting errors
   - Run `npm run build:functions` to verify TypeScript compilation
   - Report any build errors

3. **Critical File Checks**
   - Verify all Lambda functions compile successfully
   - Check for any missing imports or type errors
   - Validate that userId is using Cognito sub (not username) in:
     - `functions/auth/login.ts`
     - `functions/auth/register.ts`
     - `functions/auth/appleLogin.ts`
     - `functions/transactions/create-transaction.ts`

4. **Summary Report**
   - List all errors found
   - Provide recommendations for fixes
   - Indicate if safe to deploy

## Success Criteria
- ✅ All linting passes
- ✅ Backend builds successfully
- ✅ No TypeScript errors
- ✅ UserId validation confirms Cognito sub usage
