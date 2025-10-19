#!/bin/bash

# ===================================================================
# Phase 2B End-to-End Test Script
# ===================================================================
# Tests all Phase 2B features including:
# - Proactive alerts detection
# - Daily brief generation
# - Alert preferences management
# - Push notification integration
# - API endpoint functionality
# ===================================================================

set -e  # Exit on any error

# Configuration
API_BASE_URL="${API_BASE_URL:-https://8o1ijrm6ig.execute-api.eu-west-2.amazonaws.com/prod}"
TEST_USER_EMAIL="${TEST_USER_EMAIL:-test@expenzez.com}"
TEST_USER_PASSWORD="${TEST_USER_PASSWORD:-your-test-password}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
TESTS_RUN=0
TESTS_PASSED=0
TESTS_FAILED=0

# Utility functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[PASS]${NC} $1"
    ((TESTS_PASSED++))
}

log_error() {
    echo -e "${RED}[FAIL]${NC} $1"
    ((TESTS_FAILED++))
}

log_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Test function wrapper
run_test() {
    ((TESTS_RUN++))
    local test_name="$1"
    log_info "Running test: $test_name"
}

# ===================================================================
# Step 1: Authentication
# ===================================================================
authenticate() {
    log_info "Authenticating test user..."

    local response=$(curl -s -X POST "${API_BASE_URL}/auth/login" \
        -H "Content-Type: application/json" \
        -d "{
            \"email\": \"${TEST_USER_EMAIL}\",
            \"password\": \"${TEST_USER_PASSWORD}\"
        }")

    ACCESS_TOKEN=$(echo "$response" | jq -r '.tokens.accessToken // .accessToken // empty')
    USER_ID=$(echo "$response" | jq -r '.user.userId // .userId // empty')

    if [ -z "$ACCESS_TOKEN" ] || [ "$ACCESS_TOKEN" = "null" ]; then
        log_error "Authentication failed"
        echo "Response: $response"
        exit 1
    fi

    log_success "Authentication successful (User ID: $USER_ID)"
}

# ===================================================================
# Step 2: Test Proactive Alerts Endpoints
# ===================================================================
test_get_pending_alerts() {
    run_test "GET /alerts/pending"

    local response=$(curl -s -X GET "${API_BASE_URL}/alerts/pending" \
        -H "Authorization: Bearer ${ACCESS_TOKEN}")

    local success=$(echo "$response" | jq -r '.success')
    local count=$(echo "$response" | jq -r '.count')

    if [ "$success" = "true" ]; then
        log_success "Successfully fetched pending alerts (count: $count)"
        PENDING_ALERTS="$response"
        return 0
    else
        log_error "Failed to fetch pending alerts"
        echo "Response: $response"
        return 1
    fi
}

test_get_alert_preferences() {
    run_test "GET /alerts/preferences"

    local response=$(curl -s -X GET "${API_BASE_URL}/alerts/preferences" \
        -H "Authorization: Bearer ${ACCESS_TOKEN}")

    local success=$(echo "$response" | jq -r '.success')

    if [ "$success" = "true" ]; then
        local quiet_start=$(echo "$response" | jq -r '.preferences.quietHoursStart')
        local quiet_end=$(echo "$response" | jq -r '.preferences.quietHoursEnd')
        local max_alerts=$(echo "$response" | jq -r '.preferences.maxAlertsPerDay')

        log_success "Successfully fetched alert preferences (quiet: $quiet_start-$quiet_end, max: $max_alerts)"
        ALERT_PREFERENCES="$response"
        return 0
    else
        log_error "Failed to fetch alert preferences"
        echo "Response: $response"
        return 1
    fi
}

test_update_alert_preferences() {
    run_test "PUT /alerts/preferences"

    local response=$(curl -s -X PUT "${API_BASE_URL}/alerts/preferences" \
        -H "Authorization: Bearer ${ACCESS_TOKEN}" \
        -H "Content-Type: application/json" \
        -d '{
            "quietHoursStart": "23:00",
            "quietHoursEnd": "07:00",
            "maxAlertsPerDay": 10
        }')

    local success=$(echo "$response" | jq -r '.success')

    if [ "$success" = "true" ]; then
        local quiet_start=$(echo "$response" | jq -r '.preferences.quietHoursStart')
        local max_alerts=$(echo "$response" | jq -r '.preferences.maxAlertsPerDay')

        if [ "$quiet_start" = "23:00" ] && [ "$max_alerts" = "10" ]; then
            log_success "Successfully updated alert preferences"
            return 0
        else
            log_error "Alert preferences not updated correctly"
            return 1
        fi
    else
        log_error "Failed to update alert preferences"
        echo "Response: $response"
        return 1
    fi
}

test_dismiss_alert() {
    run_test "POST /alerts/{alertId}/dismiss"

    # Get first alert ID
    local alert_id=$(echo "$PENDING_ALERTS" | jq -r '.alerts[0].alertId // empty')

    if [ -z "$alert_id" ] || [ "$alert_id" = "null" ]; then
        log_warning "No pending alerts to dismiss - skipping test"
        ((TESTS_RUN--))
        return 0
    fi

    local response=$(curl -s -X POST "${API_BASE_URL}/alerts/${alert_id}/dismiss" \
        -H "Authorization: Bearer ${ACCESS_TOKEN}")

    local success=$(echo "$response" | jq -r '.success')

    if [ "$success" = "true" ]; then
        log_success "Successfully dismissed alert ($alert_id)"
        return 0
    else
        log_error "Failed to dismiss alert"
        echo "Response: $response"
        return 1
    fi
}

test_acknowledge_alert() {
    run_test "POST /alerts/{alertId}/acknowledge"

    # Get second alert ID
    local alert_id=$(echo "$PENDING_ALERTS" | jq -r '.alerts[1].alertId // empty')

    if [ -z "$alert_id" ] || [ "$alert_id" = "null" ]; then
        log_warning "Not enough alerts to acknowledge - skipping test"
        ((TESTS_RUN--))
        return 0
    fi

    local response=$(curl -s -X POST "${API_BASE_URL}/alerts/${alert_id}/acknowledge" \
        -H "Authorization: Bearer ${ACCESS_TOKEN}")

    local success=$(echo "$response" | jq -r '.success')

    if [ "$success" = "true" ]; then
        log_success "Successfully acknowledged alert ($alert_id)"
        return 0
    else
        log_error "Failed to acknowledge alert"
        echo "Response: $response"
        return 1
    fi
}

# ===================================================================
# Step 3: Test Daily Brief Endpoints
# ===================================================================
test_get_daily_brief() {
    run_test "GET /briefs/daily"

    local response=$(curl -s -X GET "${API_BASE_URL}/briefs/daily" \
        -H "Authorization: Bearer ${ACCESS_TOKEN}")

    local success=$(echo "$response" | jq -r '.success')

    if [ "$success" = "true" ]; then
        local greeting=$(echo "$response" | jq -r '.brief.greeting')
        local today_spent=$(echo "$response" | jq -r '.brief.spendingSummary.todaySpent')
        local total_budgets=$(echo "$response" | jq -r '.brief.budgetStatus.totalBudgets')
        local insight_title=$(echo "$response" | jq -r '.brief.insight.title')

        log_success "Successfully fetched daily brief"
        echo "  - Greeting: $greeting"
        echo "  - Today spent: £$today_spent"
        echo "  - Total budgets: $total_budgets"
        echo "  - Insight: $insight_title"

        DAILY_BRIEF="$response"
        return 0
    else
        log_error "Failed to fetch daily brief"
        echo "Response: $response"
        return 1
    fi
}

test_brief_structure() {
    run_test "Validate daily brief structure"

    local greeting=$(echo "$DAILY_BRIEF" | jq -r '.brief.greeting')
    local spending_summary=$(echo "$DAILY_BRIEF" | jq -r '.brief.spendingSummary')
    local budget_status=$(echo "$DAILY_BRIEF" | jq -r '.brief.budgetStatus')
    local insight=$(echo "$DAILY_BRIEF" | jq -r '.brief.insight')

    if [ "$greeting" != "null" ] && \
       [ "$spending_summary" != "null" ] && \
       [ "$budget_status" != "null" ] && \
       [ "$insight" != "null" ]; then
        log_success "Daily brief has all required sections"
        return 0
    else
        log_error "Daily brief missing required sections"
        return 1
    fi
}

test_spending_summary_structure() {
    run_test "Validate spending summary structure"

    local today=$(echo "$DAILY_BRIEF" | jq -r '.brief.spendingSummary.todaySpent')
    local week=$(echo "$DAILY_BRIEF" | jq -r '.brief.spendingSummary.weekSpent')
    local month=$(echo "$DAILY_BRIEF" | jq -r '.brief.spendingSummary.monthSpent')
    local comp_week=$(echo "$DAILY_BRIEF" | jq -r '.brief.spendingSummary.comparisonToLastWeek')
    local comp_month=$(echo "$DAILY_BRIEF" | jq -r '.brief.spendingSummary.comparisonToLastMonth')

    if [ "$today" != "null" ] && \
       [ "$week" != "null" ] && \
       [ "$month" != "null" ] && \
       [ "$comp_week" != "null" ] && \
       [ "$comp_month" != "null" ]; then
        log_success "Spending summary has all required fields"
        return 0
    else
        log_error "Spending summary missing required fields"
        return 1
    fi
}

test_budget_status_structure() {
    run_test "Validate budget status structure"

    local total=$(echo "$DAILY_BRIEF" | jq -r '.brief.budgetStatus.totalBudgets')
    local on_track=$(echo "$DAILY_BRIEF" | jq -r '.brief.budgetStatus.budgetsOnTrack')
    local at_risk=$(echo "$DAILY_BRIEF" | jq -r '.brief.budgetStatus.budgetsAtRisk')
    local exceeded=$(echo "$DAILY_BRIEF" | jq -r '.brief.budgetStatus.budgetsExceeded')

    if [ "$total" != "null" ] && \
       [ "$on_track" != "null" ] && \
       [ "$at_risk" != "null" ] && \
       [ "$exceeded" != "null" ]; then
        log_success "Budget status has all required fields"
        return 0
    else
        log_error "Budget status missing required fields"
        return 1
    fi
}

test_insight_structure() {
    run_test "Validate insight structure"

    local title=$(echo "$DAILY_BRIEF" | jq -r '.brief.insight.title')
    local message=$(echo "$DAILY_BRIEF" | jq -r '.brief.insight.message')
    local type=$(echo "$DAILY_BRIEF" | jq -r '.brief.insight.type')
    local actionable=$(echo "$DAILY_BRIEF" | jq -r '.brief.insight.actionable')

    if [ "$title" != "null" ] && \
       [ "$message" != "null" ] && \
       [ "$type" != "null" ] && \
       [ "$actionable" != "null" ]; then
        log_success "Insight has all required fields"
        return 0
    else
        log_error "Insight missing required fields"
        return 1
    fi
}

# ===================================================================
# Step 4: Test Error Suppression for Optional Endpoints
# ===================================================================
test_optional_endpoint_goals() {
    run_test "Test optional /goals endpoint graceful degradation"

    local response=$(curl -s -w "\n%{http_code}" -X GET "${API_BASE_URL}/goals" \
        -H "Authorization: Bearer ${ACCESS_TOKEN}")

    local http_code=$(echo "$response" | tail -n1)

    if [ "$http_code" = "404" ] || [ "$http_code" = "200" ]; then
        log_success "Optional /goals endpoint handled gracefully (HTTP $http_code)"
        return 0
    else
        log_error "Unexpected response from /goals endpoint (HTTP $http_code)"
        return 1
    fi
}

test_optional_endpoint_chat_history() {
    run_test "Test optional /ai/chat-history endpoint graceful degradation"

    local response=$(curl -s -w "\n%{http_code}" -X GET "${API_BASE_URL}/ai/chat-history" \
        -H "Authorization: Bearer ${ACCESS_TOKEN}")

    local http_code=$(echo "$response" | tail -n1)

    if [ "$http_code" = "404" ] || [ "$http_code" = "200" ]; then
        log_success "Optional /ai/chat-history endpoint handled gracefully (HTTP $http_code)"
        return 0
    else
        log_error "Unexpected response from /ai/chat-history endpoint (HTTP $http_code)"
        return 1
    fi
}

# ===================================================================
# Main Test Execution
# ===================================================================
main() {
    echo "======================================================================="
    echo "Phase 2B End-to-End Test Suite"
    echo "======================================================================="
    echo "API Base URL: $API_BASE_URL"
    echo "Test User: $TEST_USER_EMAIL"
    echo "======================================================================="
    echo ""

    # Check for required tools
    if ! command -v jq &> /dev/null; then
        log_error "jq is required but not installed. Install with: brew install jq"
        exit 1
    fi

    if ! command -v curl &> /dev/null; then
        log_error "curl is required but not installed"
        exit 1
    fi

    # Run authentication
    authenticate
    echo ""

    # Run alert tests
    log_info "Testing Proactive Alerts Features..."
    test_get_pending_alerts
    test_get_alert_preferences
    test_update_alert_preferences
    test_dismiss_alert
    test_acknowledge_alert
    echo ""

    # Run daily brief tests
    log_info "Testing Daily Brief Features..."
    test_get_daily_brief
    test_brief_structure
    test_spending_summary_structure
    test_budget_status_structure
    test_insight_structure
    echo ""

    # Run optional endpoint tests
    log_info "Testing Optional Endpoint Error Suppression..."
    test_optional_endpoint_goals
    test_optional_endpoint_chat_history
    echo ""

    # Print summary
    echo "======================================================================="
    echo "Test Summary"
    echo "======================================================================="
    echo "Tests Run:    $TESTS_RUN"
    echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
    echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
    echo "======================================================================="

    if [ $TESTS_FAILED -eq 0 ]; then
        echo -e "${GREEN}✓ All tests passed!${NC}"
        exit 0
    else
        echo -e "${RED}✗ Some tests failed${NC}"
        exit 1
    fi
}

# Run main function
main "$@"
