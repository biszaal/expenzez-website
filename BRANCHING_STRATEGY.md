# Git Branching Strategy

This repository follows a three-branch strategy optimized for mobile app development and App Store submissions.

## Branch Structure

### 🚀 `production`
- **Purpose**: Live App Store releases
- **Environment**: Production AWS stage
- **Deployment**: App Store submissions
- **Protection**: Require pull request reviews
- **Tags**: All releases are tagged (v1.0.1, v1.0.2, etc.)

### 🧪 `testing` 
- **Purpose**: Release candidates and TestFlight builds
- **Environment**: Staging AWS stage
- **Deployment**: TestFlight for user testing
- **Protection**: Require pull request reviews
- **Source**: Merges from `development`

### 💻 `development`
- **Purpose**: Active development and feature work
- **Environment**: Development AWS stage  
- **Deployment**: Auto-deploy for internal testing
- **Protection**: Allow direct pushes for solo development
- **Source**: Daily development work

## Workflow

### Daily Development
```bash
git checkout development
# Make changes
git add .
git commit -m "Feature: description"
git push origin development
```

### Release to Testing
```bash
git checkout testing
git merge development
git push origin testing
# Build TestFlight from testing branch
```

### Release to Production
```bash
git checkout production  
git merge testing
git tag -a v1.0.2 -m "Release description"
git push origin production
git push origin v1.0.2
# Submit to App Store from production branch
```

### Hotfixes
```bash
git checkout production
git checkout -b hotfix/critical-fix
# Make fix
git checkout production
git merge hotfix/critical-fix
git checkout testing  
git merge hotfix/critical-fix
git checkout development
git merge hotfix/critical-fix
```

## Environment Mapping

| Branch | Environment | AWS Stage | Deployment Target |
|--------|-------------|-----------|-------------------|
| `development` | Development | `dev` | Auto-deploy |
| `testing` | Staging | `staging` | TestFlight |
| `production` | Production | `prod` | App Store |

## Current Status

- ✅ Three-branch structure created
- ✅ Production tagged as v1.0.1
- ✅ Ready for App Store submission from `production`
- ✅ All App Store fixes included:
  - Account deletion functionality
  - Notification system fixes
  - Image picker implementation
  - Authentication improvements
  - Google Sign In removal

## Next Steps

1. Submit current `production` branch to App Store
2. Continue development on `development` branch
3. Use `testing` branch for TestFlight builds
4. Set up GitHub branch protection rules