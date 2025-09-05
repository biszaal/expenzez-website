#!/bin/bash
echo "Setting up DynamoDB backups..."

tables=(
    "Users" 
    "BankConnections" 
    "UserTransactions" 
    "AIChatHistory" 
    "NotificationTokens" 
    "NotificationPreferences" 
    "NotificationHistory" 
    "NotificationQueue" 
    "UserBudgets" 
    "BudgetAlerts"
    "SpendingPatterns"
    "AnomalyAlerts"
    "SecurityEvents"
    "SecurityProfiles"
    "UserBillPreferences"
    "MonthlyAIReports"
)

for table in "${tables[@]}"; do
    echo "Enabling backup for $table..."
    aws dynamodb put-continuous-backups \
        --table-name $table \
        --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true \
        --region eu-west-2 || echo "Failed to enable backup for $table (table may not exist yet)"
done
echo "✅ DynamoDB backups configured"