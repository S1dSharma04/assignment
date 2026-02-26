# Quick Deployment Guide

## Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Hospital Appointment Scheduler"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named "hospital-appointment-scheduler"
3. Don't initialize with README (we already have one)

## Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/hospital-appointment-scheduler.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel (Recommended)

### Option A: Using Vercel Website
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Vite
6. Click "Deploy"
7. Get your live URL!

### Option B: Using Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

## Step 5: Deploy to Netlify (Alternative)

### Option A: Using Netlify Website
1. Go to https://app.netlify.com
2. Sign in with GitHub
3. Click "Add new site" > "Import an existing project"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"

### Option B: Using Netlify CLI
```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

## Step 6: Make Additional Commits

```bash
# Make some changes to the code
git add .
git commit -m "Add error handling improvements"

# Make another change
git add .
git commit -m "Update UI styling"

# Push all commits
git push
```

## Step 7: Update README

After deployment, update README.md with:
- Your GitHub repository URL
- Your live deployment URL
- Your demo video link

## Step 8: Record Demo Video

Use any screen recording tool:
- Windows: Xbox Game Bar (Win + G)
- Mac: QuickTime Player
- Online: Loom, Screencast-O-Matic

Upload to:
- YouTube (unlisted)
- Google Drive (public link)
- Loom

## Checklist

- [ ] Git repository initialized
- [ ] At least 3 commits made
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel/Netlify
- [ ] README updated with URLs
- [ ] Demo video recorded and linked
- [ ] All features tested on live site
