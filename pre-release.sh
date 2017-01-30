#!/usr/bin/env bash

# Get arguments
while [[ $# -gt 0 ]]
do
  key="$1"

case $key in
    -v|--version)
    version="$2"
    shift
    ;;
    -b|--branch)
    branch="$2"
    shift
    ;;
    *)
      # unknown option
    ;;
esac
shift
done

# Version must be given
if [ -z "$version" ]; then
  echo "Please specify a version with -v or --version"
  exit
fi

# Branch must be given
if [ -z "$branch" ]; then
  echo "Please specify source branch with -b or --branch"
  exit
fi

# Ensure working directory is clean
git update-index -q --refresh
if ! git diff-index --quiet HEAD --; then
  echo "Working directory not clean"
  exit 1
fi

# Create new version branch
echo "Creating new version branch $version based off $branch..."
git checkout -b $version $branch
git push --set-upstream origin $version

# Bump version
echo "Bumping version..."
npm version $version

# Success
echo "Pre release script complete"
