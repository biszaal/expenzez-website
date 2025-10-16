# Finexer Open Banking Setup

## 🔐 Environment Variables Required

Add these environment variables to your backend `.env` file:

```bash
# Finexer Open Banking Configuration
FINEXER_API_URL=https://api.finexer.com
FINEXER_API_KEY=sk_Kl98rLyuS7dPSwSE2sbSOg1K5Xg5aEFyAn5CeLKlBjozIKB1jYr4Ztpr4QHQe
FINEXER_CLIENT_ID=your-finexer-client-id
FINEXER_CLIENT_SECRET=your-finexer-client-secret
FINEXER_WEBHOOK_SECRET=your-finexer-webhook-secret
```

## 🚀 Deployment Steps

1. **Add Environment Variables**: Update your backend `.env` file with the above variables
2. **Deploy Backend**: Run `serverless deploy` to deploy the Lambda functions
3. **Test Integration**: Use the Connect Bank quick action to test the OAuth2 flow

## 🔒 Security Notes

- ✅ API Key is securely stored in environment variables
- ✅ No hardcoded credentials in source code
- ✅ Proper authentication headers for all Finexer API calls
- ✅ Webhook signature validation for security

## 📋 Next Steps

1. Configure Finexer dashboard with your app details
2. Set up OAuth2 redirect URLs
3. Configure webhook endpoints
4. Test bank connection flow
5. Deploy to production

## 🧪 Testing

The Finexer integration is ready for testing:

- **Connect Bank**: Quick action button navigates to `/banking/connect`
- **OAuth2 Flow**: Handles authorization and token exchange
- **Account Sync**: Fetches and syncs bank accounts
- **Transaction Sync**: Automatically imports transactions

## 📚 Documentation

- [Finexer API Documentation](https://docs.finexer.com)
- [OAuth2 Implementation Guide](https://docs.finexer.com/oauth2)
- [Webhook Configuration](https://docs.finexer.com/webhooks)
