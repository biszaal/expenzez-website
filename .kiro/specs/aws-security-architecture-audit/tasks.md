# Implementation Plan: AWS Backend Security & Architecture Audit

## Overview

This implementation plan provides a structured approach to securing and optimizing the Expenzez AWS backend infrastructure. Tasks are organized by priority and designed to be executed incrementally without disrupting the live production service.

## Implementation Tasks

- [x] 1. Immediate Security Fixes (Critical - Week 1)

  - Migrate secrets from .env to AWS Secrets Manager and update Lambda functions to retrieve secrets at runtime
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 1.1 Create AWS Secrets Manager secrets for all sensitive credentials

  - Create secret for JWT configuration: `/expenzez/prod/jwt`
  - Create secret for OpenAI API key: `/expenzez/prod/openai`
  - Create secret for Apple Sign-In credentials: `/expenzez/prod/apple`
  - Create secret for RevenueCat credentials: `/expenzez/prod/revenuecat`
  - Create secrets for dev and staging environments with appropriate values
  - _Requirements: 5.1, 5.2_

- [x] 1.2 Implement secrets retrieval service in Lambda functions

  - Create `functions/lib/secretsManager.ts` utility to fetch and cache secrets
  - Implement in-memory caching with TTL to reduce API calls
  - Add error handling and fallback mechanisms
  - Update all Lambda functions to use secrets manager instead of environment variables
  - _Requirements: 5.3, 5.4_

- [x] 1.3 Update CORS configuration to restrict origins

  - Modify `serverless.yml` to replace wildcard `*` with specific allowed origins
  - Add production domain, staging domain, and mobile app origins
  - Enable `allowCredentials: true` for secure cookie handling
  - Test CORS configuration with frontend applications
  - _Requirements: 1.7_

- [x] 1.4 Remove .env file from repository and update .gitignore

  - Create `.env.template` file with placeholder values for local development
  - Remove `.env` file from repository
  - Update `.gitignore` to ensure `.env` is never committed
  - Remove `.env` from git history using `git filter-branch` or BFG Repo-Cleaner
  - Update README with instructions for local development setup
  - _Requirements: 5.8_

- [x] 1.5 Implement comprehensive input validation across all endpoints

  - Review all Lambda functions for missing input validation
  - Enhance `InputValidator` class with additional validation methods
  - Add validation for all user inputs in auth, transaction, and profile endpoints
  - Implement sanitization for string inputs to prevent XSS
  - Add request size limits and content-type validation
  - _Requirements: 9.1, 9.2, 9.3, 9.6_

- [ ] 2. IAM Policy Hardening (Critical - Week 1)

  - Implement least-privilege IAM policies for all Lambda functions
  - _Requirements: 1.2, 7.2_

- [x] 2.1 Audit current IAM permissions and document access requirements

  - List all Lambda functions and their required DynamoDB table access
  - Document required AWS service permissions (SES, SNS, Cognito, Secrets Manager)
  - Identify overly permissive wildcard permissions
  - Create access matrix mapping functions to resources
  - _Requirements: 1.2_

- [x] 2.2 Create function-specific IAM roles with minimal permissions

  - Create separate IAM role for auth functions (Users, SecurityEvents, LoginAttempts tables)
  - Create separate IAM role for transaction functions (Transactions, Users tables)
  - Create separate IAM role for AI functions (AIChatHistory, AIUsageTracking, AIResponseCache tables)
  - Create separate IAM role for notification functions (NotificationHistory, NotificationTokens tables)
  - Remove wildcard `dynamodb:*` permissions and specify exact actions needed
  - _Requirements: 1.2, 7.2_

- [ ] 2.3 Update serverless.yml with new IAM role configurations

  - Define custom IAM roles in `serverless.yml` resources section
  - Assign appropriate roles to each Lambda function
  - Test deployments to ensure functions have necessary permissions
  - Remove unused IAM permissions
  - _Requirements: 1.2_

- [ ] 2.4 Implement IAM policy for Secrets Manager access

  - Create IAM policy allowing Lambda functions to read specific secrets
  - Restrict access to secrets by environment (dev functions can't access prod secrets)
  - Enable CloudTrail logging for secret access
  - _Requirements: 5.5, 5.7_

- [ ] 3. DynamoDB Encryption and Backup (High Priority - Week 2)

  - Enable encryption at rest for all DynamoDB tables using AWS KMS
  - _Requirements: 6.1, 6.5, 6.7_

- [x] 3.1 Create KMS customer-managed key for DynamoDB encryption

  - Create KMS key with appropriate key policy
  - Enable automatic key rotation
  - Grant Lambda execution roles permission to use the key
  - Tag key for cost allocation and management
  - _Requirements: 6.1, 6.5, 6.6_

- [x] 3.2 Enable encryption at rest for all DynamoDB tables

  - Update CloudFormation/Serverless configuration to enable SSE with KMS
  - Apply encryption to existing tables (requires table recreation or AWS CLI update)
  - Verify encryption is enabled for all tables
  - Document encryption configuration
  - _Requirements: 6.1_

- [ ] 3.3 Enable point-in-time recovery for critical tables

  - Enable PITR for Users, Transactions, AIChatHistory, and other critical tables
  - Configure backup retention period (35 days)
  - Test restore procedure in development environment
  - Document backup and restore procedures
  - _Requirements: 6.7_

- [ ] 3.4 Implement field-level encryption for PII data

  - Create `FieldEncryption` utility class using KMS
  - Identify fields containing PII (email, phone_number, address, birthdate)
  - Update user data storage functions to encrypt sensitive fields
  - Update user data retrieval functions to decrypt sensitive fields
  - Test encryption/decryption performance impact
  - _Requirements: 6.4_

- [ ] 4. CloudFormation Resource Optimization (High Priority - Week 2)

  - Reduce CloudFormation resource count to stay within AWS limits
  - _Requirements: 3.1, 3.2, 3.5, 3.6_

- [x] 4.1 Remove duplicate OPTIONS endpoint handlers

  - Configure API Gateway to automatically handle OPTIONS requests via CORS
  - Remove explicit OPTIONS handlers from serverless.yml (saves ~60 resources)
  - Test CORS preflight requests still work correctly
  - _Requirements: 3.5_

- [x] 4.2 Consolidate or remove commented-out Lambda functions

  - Review all commented-out functions in serverless.yml
  - Delete functions that are no longer needed
  - Move future-feature functions to separate stack or branch
  - Document decisions for each commented function
  - _Requirements: 3.2, 3.6_

- [ ] 4.3 Split monolithic stack into multiple nested stacks

  - Create separate CloudFormation templates for core infrastructure, auth, transactions, AI, and notifications
  - Implement nested stack pattern in serverless.yml
  - Configure cross-stack references for shared resources
  - Test deployment of individual stacks
  - Verify resource count is under 500 per stack
  - _Requirements: 3.3, 3.4_

- [ ] 4.4 Optimize Lambda function packaging and deployment

  - Enable individual function packaging in serverless.yml
  - Exclude unnecessary files from deployment packages
  - Implement Lambda layers for shared dependencies
  - Reduce cold start times by optimizing bundle sizes
  - _Requirements: 3.6_

- [ ] 5. Environment Separation and CI/CD Pipeline (High Priority - Week 3)

  - Set up separate AWS environments for development, staging, and production
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 5.1 Create separate AWS accounts or use AWS Organizations

  - Set up AWS Organizations with separate accounts for dev, staging, and prod
  - Configure consolidated billing
  - Set up cross-account IAM roles for deployment
  - Document account structure and access procedures
  - _Requirements: 4.1_

- [ ] 5.2 Configure environment-specific resources in serverless.yml

  - Create stage-specific configuration in serverless.yml custom section
  - Use AWS Systems Manager Parameter Store for environment-specific values
  - Configure separate Cognito User Pools for each environment
  - Set up separate DynamoDB tables with environment prefixes
  - _Requirements: 4.1, 4.6_

- [ ] 5.3 Create GitHub Actions workflow for automated deployments

  - Create `.github/workflows/deploy.yml` with jobs for test, deploy-dev, deploy-staging, deploy-prod
  - Configure AWS credentials as GitHub secrets for each environment
  - Implement automated testing before deployment
  - Add deployment approval gates for production
  - _Requirements: 4.2, 4.3, 4.4_

- [ ] 5.4 Implement automated testing in CI pipeline

  - Set up Jest for unit testing
  - Create unit tests for critical functions (auth, transactions, rate limiting)
  - Implement integration tests for API endpoints
  - Add security tests (SQL injection, XSS, rate limiting)
  - Configure test coverage reporting
  - _Requirements: 4.2_

- [ ] 5.5 Configure deployment rollback procedures

  - Implement CloudFormation rollback on failure
  - Create manual rollback scripts for emergency situations
  - Document rollback procedures in runbook
  - Test rollback in staging environment
  - _Requirements: 4.5_

- [ ] 5.6 Set up blue-green deployment strategy

  - Configure API Gateway stages for blue-green deployments
  - Implement traffic shifting with weighted routing
  - Create deployment scripts for gradual rollout
  - Test blue-green deployment in staging
  - _Requirements: 4.9_

- [ ] 6. Enhanced Rate Limiting and Security Controls (Medium Priority - Week 3)

  - Implement distributed rate limiting and additional security controls
  - _Requirements: 1.6, 2.2, 9.5_

- [ ] 6.1 Create RateLimits DynamoDB table with TTL

  - Define table schema with composite key (userId:endpoint:window)
  - Enable TTL for automatic cleanup of old records
  - Configure appropriate read/write capacity
  - _Requirements: 1.6_

- [ ] 6.2 Implement distributed rate limiter using DynamoDB

  - Enhance `RateLimiter` class to use DynamoDB with conditional writes
  - Implement sliding window rate limiting algorithm
  - Add rate limit headers to API responses
  - Configure different limits for auth, API, AI, and sensitive endpoints
  - _Requirements: 1.6, 2.2_

- [ ] 6.3 Add rate limiting middleware to all Lambda functions

  - Create `withRateLimit` higher-order function wrapper
  - Apply rate limiting to auth endpoints (5 requests per 5 minutes)
  - Apply rate limiting to AI endpoints (300 requests per hour)
  - Apply rate limiting to sensitive operations (10 requests per 15 minutes)
  - _Requirements: 1.6_

- [ ] 6.4 Implement token revocation mechanism

  - Create RevokedTokens DynamoDB table with TTL
  - Implement token revocation on password change and account deletion
  - Add token revocation check to JWT verification middleware
  - Test token revocation flow
  - _Requirements: 2.1_

- [ ] 6.5 Add request size limits and content-type validation

  - Configure API Gateway to enforce maximum payload size (1MB)
  - Implement content-type validation in Lambda functions
  - Reject requests with unexpected content types
  - _Requirements: 9.5, 9.6_

- [ ] 7. Monitoring, Logging, and Alerting (Medium Priority - Week 4)

  - Implement comprehensive monitoring and alerting infrastructure
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.9_

- [ ] 7.1 Enable CloudWatch Logs for all Lambda functions

  - Configure log retention policies (30 days for prod, 7 days for dev)
  - Implement structured logging with JSON format
  - Add request ID tracking for correlation
  - Configure log groups with appropriate permissions
  - _Requirements: 8.1, 8.9_

- [ ] 7.2 Enable AWS CloudTrail for audit logging

  - Create CloudTrail trail for all API calls
  - Configure S3 bucket for CloudTrail logs with encryption
  - Enable log file validation
  - Set up CloudTrail log retention policy
  - _Requirements: 8.2, 5.7_

- [ ] 7.3 Create CloudWatch dashboards for key metrics

  - Create dashboard for Lambda performance (invocations, errors, duration)
  - Create dashboard for DynamoDB metrics (read/write capacity, errors)
  - Create dashboard for API Gateway metrics (requests, latency, errors)
  - Create dashboard for security events (failed logins, rate limit hits)
  - _Requirements: 8.10_

- [ ] 7.4 Configure CloudWatch alarms for critical metrics

  - Create alarm for high error rate (>5% errors)
  - Create alarm for high latency (p99 > 3 seconds)
  - Create alarm for DynamoDB throttling
  - Create alarm for suspicious security events
  - Configure SNS topic for alarm notifications
  - _Requirements: 8.3_

- [ ] 7.5 Implement AWS X-Ray tracing for distributed tracing

  - Enable X-Ray tracing in serverless.yml for Lambda and API Gateway
  - Instrument code with X-Ray SDK
  - Create subsegments for external service calls (OpenAI, DynamoDB)
  - Configure X-Ray sampling rules
  - _Requirements: 8.6_

- [ ] 7.6 Integrate error tracking service (Sentry)

  - Set up Sentry project for backend
  - Install Sentry SDK in Lambda functions
  - Configure error capturing and reporting
  - Set up Sentry alerts for critical errors
  - _Requirements: 8.5_

- [ ] 7.7 Create CloudWatch Insights queries for common investigations

  - Create query for failed authentication attempts
  - Create query for slow API requests
  - Create query for DynamoDB errors
  - Create query for rate limit violations
  - Document queries in runbook
  - _Requirements: 8.4_

- [ ] 8. Network Security and VPC Configuration (Medium Priority - Week 4)

  - Deploy Lambda functions in VPC for enhanced network security
  - _Requirements: 7.1, 7.3, 7.7_

- [ ] 8.1 Create VPC with public and private subnets

  - Create VPC with CIDR block
  - Create private subnets in multiple availability zones
  - Create public subnets for NAT gateways
  - Configure route tables
  - _Requirements: 7.1_

- [ ] 8.2 Configure NAT gateways for Lambda internet access

  - Create NAT gateways in public subnets
  - Configure route tables to route internet traffic through NAT
  - Test Lambda functions can access external APIs (OpenAI)
  - _Requirements: 7.1_

- [ ] 8.3 Create VPC endpoints for AWS services

  - Create VPC endpoint for DynamoDB
  - Create VPC endpoint for Secrets Manager
  - Create VPC endpoint for CloudWatch Logs
  - Create VPC endpoint for SES and SNS
  - Configure endpoint policies for least-privilege access
  - _Requirements: 7.7_

- [ ] 8.4 Configure security groups for Lambda functions

  - Create security group for Lambda functions
  - Configure ingress rules (none needed for Lambda)
  - Configure egress rules (HTTPS to AWS services and external APIs)
  - _Requirements: 7.2_

- [ ] 8.5 Deploy Lambda functions in VPC

  - Update serverless.yml to configure VPC for Lambda functions
  - Test Lambda functions work correctly in VPC
  - Monitor cold start times (VPC adds latency)
  - Optimize VPC configuration for performance
  - _Requirements: 7.1_

- [ ] 9. AWS WAF and Advanced Security (Low Priority - Week 5)

  - Implement AWS WAF for additional protection against common attacks
  - _Requirements: 7.4, 7.5_

- [ ] 9.1 Create AWS WAF Web ACL

  - Create Web ACL for API Gateway
  - Configure default action (allow or block)
  - Associate Web ACL with API Gateway stage
  - _Requirements: 7.4_

- [ ] 9.2 Configure AWS WAF managed rule groups

  - Enable AWS Managed Rules for Core Rule Set (CRS)
  - Enable AWS Managed Rules for Known Bad Inputs
  - Enable AWS Managed Rules for SQL Injection
  - Enable AWS Managed Rules for XSS
  - Test rules don't block legitimate traffic
  - _Requirements: 7.4_

- [ ] 9.3 Implement custom WAF rules for rate limiting

  - Create rate-based rule for IP-based rate limiting
  - Create rate-based rule for geographic restrictions (if needed)
  - Configure rule actions (block, count, or challenge)
  - _Requirements: 7.4_

- [ ] 9.4 Enable AWS GuardDuty for threat detection

  - Enable GuardDuty in AWS account
  - Configure GuardDuty findings to send to SNS
  - Create CloudWatch alarms for high-severity findings
  - Review GuardDuty findings regularly
  - _Requirements: 8.7_

- [ ] 10. Error Handling and Resilience (Low Priority - Week 5)

  - Implement standardized error handling and resilience patterns
  - _Requirements: 9.7_

- [ ] 10.1 Create standardized error response format

  - Define `APIError` interface with error code, message, and requestId
  - Implement `ErrorHandler` class for consistent error responses
  - Ensure no sensitive information is exposed in error messages
  - _Requirements: 9.7_

- [ ] 10.2 Implement error handling middleware for all Lambda functions

  - Create error handling wrapper function
  - Apply to all Lambda handlers
  - Log full error details internally while returning sanitized errors to clients
  - _Requirements: 9.7_

- [ ] 10.3 Implement circuit breaker pattern for external services

  - Create `CircuitBreaker` class for OpenAI API calls
  - Configure failure thresholds and timeout periods
  - Implement fallback mechanisms when circuit is open
  - Test circuit breaker behavior under failure conditions
  - _Requirements: 9.7_

- [ ] 10.4 Add retry logic with exponential backoff

  - Implement retry logic for transient failures
  - Configure exponential backoff with jitter
  - Set maximum retry attempts
  - _Requirements: 9.7_

- [ ] 11. Compliance and Audit Readiness (Low Priority - Week 6)

  - Prepare infrastructure for compliance audits
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 11.1 Document architecture and data flow

  - Create architecture diagrams showing all components
  - Document data flow for sensitive operations
  - Create network diagrams showing VPC configuration
  - Document security controls and their purposes
  - _Requirements: 10.6_

- [ ] 11.2 Implement data retention and deletion policies

  - Configure DynamoDB TTL for temporary data
  - Implement data deletion on account closure
  - Document data retention periods for each table
  - Test data deletion procedures
  - _Requirements: 10.2, 10.4_

- [ ] 11.3 Enable AWS Config for compliance monitoring

  - Enable AWS Config in account
  - Configure Config rules for security best practices
  - Set up Config compliance dashboard
  - Configure notifications for non-compliant resources
  - _Requirements: 10.5_

- [ ] 11.4 Create security audit runbook

  - Document security incident response procedures
  - Create checklist for regular security reviews
  - Document access review procedures
  - Create escalation procedures for security events
  - _Requirements: 10.5, 10.6_

- [ ] 11.5 Implement automated vulnerability scanning

  - Configure AWS Inspector for Lambda functions
  - Set up dependency scanning in CI/CD pipeline
  - Configure automated security scanning on pull requests
  - _Requirements: 10.8_

- [ ] 12. Performance Optimization and Cost Reduction (Low Priority - Week 6)

  - Optimize Lambda performance and reduce AWS costs
  - _Requirements: 2.5, 2.6_

- [ ] 12.1 Implement caching layer for frequently accessed data

  - Identify frequently accessed DynamoDB queries
  - Implement in-memory caching in Lambda functions
  - Consider ElastiCache for shared caching across functions
  - Measure cache hit rates and performance improvements
  - _Requirements: 2.5_

- [ ] 12.2 Optimize Lambda memory allocation

  - Use AWS Lambda Power Tuning tool to find optimal memory settings
  - Adjust memory for each function based on performance testing
  - Monitor cost impact of memory changes
  - _Requirements: 2.5_

- [ ] 12.3 Implement DynamoDB query optimization

  - Review all DynamoDB queries for efficiency
  - Add secondary indexes where needed
  - Implement batch operations where possible
  - Use DynamoDB Streams for event-driven processing
  - _Requirements: 2.2_

- [ ] 12.4 Configure CloudWatch Logs retention policies
  - Set retention to 7 days for development logs
  - Set retention to 30 days for production logs
  - Archive old logs to S3 for long-term storage
  - _Requirements: 8.9_

## Summary

This implementation plan provides a comprehensive roadmap for securing and optimizing the Expenzez AWS backend. The tasks are prioritized to address critical security vulnerabilities first, followed by infrastructure optimization, CI/CD implementation, and advanced security features.

**Estimated Timeline:** 6 weeks
**Estimated Effort:** 120-150 hours
**Risk Level:** Medium (requires careful testing to avoid production disruption)

**Key Milestones:**

- Week 1: Critical security fixes complete
- Week 2: IAM hardening and CloudFormation optimization complete
- Week 3: CI/CD pipeline operational
- Week 4: Monitoring and VPC configuration complete
- Week 5: WAF and advanced security features deployed
- Week 6: Compliance and optimization complete

**Success Criteria:**

- All secrets removed from code and stored in Secrets Manager
- IAM policies follow least-privilege principle
- Separate environments for dev/staging/prod operational
- CloudFormation resource count under 500 per stack
- Automated CI/CD pipeline with testing and approval gates
- Comprehensive monitoring and alerting in place
- Zero production incidents during migration
