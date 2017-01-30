#!/usr/bin/env bash

# Ensure working directory is clean
git update-index -q --refresh
if ! git diff-index --quiet HEAD --; then
  echo "Working directory not clean"
  exit 1
fi

# Checkout master and pull from origin
echo "Pulling latest from remote..."
git checkout master || exit 1
git pull

# Get package version
version=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Delete version branch locally and on remote
echo "Deleting version branch..."
git branch -D $version
git push origin --delete $version

# Tag version
echo "Tagging as v$version..."
git tag "v$version"
git push --tags

# Create a production build
echo "Creating production build to generate sourcemaps..."
npm run build:prod

# Update sentry release
echo "Creating new Sentry release..."
npm run sentry:release
echo "Uploading sourcemaps to Sentry..."
npm run sentry:sourcemaps

# Get current branch and checkout dev if needed
branch=$(git symbolic-ref --short -q HEAD)
if [ "$branch" != "dev" ]; then
  echo "Checking out dev branch..."
  git checkout dev || exit 1
fi

# Ensure working directory in dev branch clean
git update-index -q --refresh
if ! git diff-index --quiet HEAD --; then
  echo "Working directory not clean, not merging master into dev"
else
  echo "Merging master into dev..."
  git merge master --no-ff --no-edit
  git push
fi

# Success
echo "Post release script complete"
