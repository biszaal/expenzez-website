# Deployment Agent

Safely deploy backend to AWS with validation checks.

## Pre-Deployment Checks

1. **Verify Current Branch**
   - Check git branch (should be on `main` for production)
   - Confirm with user if deploying to production

2. **Run Tests**
   - Execute `npm run lint` in `expenzez-backend/`
   - Run `npm run build:functions` to ensure clean build
   - Stop if any errors found

3. **Code Review**
   - Verify no sensitive data in code (API keys, secrets)
   - Check that environment variables are properly configured
   - Confirm userId usage is correct (Cognito sub)

## Deployment Steps

4. **Build Functions**
   - Navigate to `expenzez-backend/`
   - Run `npm run build:functions`
   - Confirm successful compilation

5. **Deploy to AWS**
   - Run `serverless deploy` (or `serverless deploy --force` if needed)
   - Monitor deployment progress
   - Capture deployment output

6. **Post-Deployment Validation**
   - Check Lambda function last modified times
   - Verify API Gateway endpoints are responding
   - Test critical endpoint: `/auth/login`
   - Check CloudWatch logs for errors

## Rollback Plan

7. **If Deployment Fails**
   - Document the error
   - Do NOT force push changes
   - Recommend rollback strategy
   - Alert user to check CloudWatch logs

## Success Report

- ✅ All functions deployed successfully
- ✅ API endpoints accessible
- ✅ No immediate errors in CloudWatch
- 🔗 Provide deployed endpoint URLs
- ⏰ Note deployment timestamp

## Important Notes

- **Production Safety**: Always deploy during low-usage hours
- **Monitoring**: Check CloudWatch logs after deployment
- **Backup**: Ensure previous working version is documented
