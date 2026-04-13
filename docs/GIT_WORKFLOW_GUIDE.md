# Professional Git Feature Branch Workflow

This document outlines the standard industry process for multiple developers working on different features within the same repository.

## 1. Initial Synchronization
Before starting any new work, a developer must ensure their local main branch is up to date with the remote server.

```bash
git checkout main
git pull origin main
```

## 2. Feature Branching
Developers never work directly on the main branch. Instead, they create a dedicated branch for each specific task or feature.

```bash
git checkout -b feature/name-of-feature
```

Naming conventions often follow:
*   feature/ (new functionality)
*   bugfix/ (fixing issues)
*   hotfix/ (critical production fixes)
*   chore/ (maintenance tasks)

## 3. Local Development Cycle
As the developer writes code, they commit changes in logical units.

```bash
git add <files>
git commit -m "type: descriptive message"
```

Common commit types:
*   feat: A new feature
*   fix: A bug fix
*   docs: Documentation changes
*   style: Formatting, missing semi colons, etc (no code changes)
*   refactor: Refactoring production code
*   test: Adding missing tests

## 4. Remote Backup and Visibility
Developers push their feature branch to the remote server frequently. This ensures work is backed up and visible to the team.

```bash
git push -u origin feature/name-of-feature
```

## 5. Staying in Sync (Rebasing)
If the main branch moves forward (e.g., another developer merges their work), the current developer should integrate those changes to minimize future conflicts.

```bash
git pull --rebase origin main
```

Rebasing rewrites the project history by applying the local commits on top of the latest changes from main, maintaining a linear history.

## 6. Pull Request (PR)
Once the feature is ready for review, the developer opens a Pull Request on the hosting platform (GitHub, GitLab, Bitbucket).

### Draft Pull Request
If the work is still in progress but feedback is needed, a Draft PR is created. This signals to the team that the code is not yet ready for merging.

### Ready for Review
Once complete, the status is changed to "Ready for Review". Senior developers or peers check the code for:
*   Logic errors
*   Security vulnerabilities
*   Code style and standards
*   Performance implications

## 7. Merge Conflict Resolution
If two developers modified the same line in the same file, a conflict occurs. Git will pause the merge/rebase and ask the developer to manually select the correct version.

1.  Open the conflicted file.
2.  Choose between "Incoming Change", "Current Change", or a combination of both.
3.  Save the file.
4.  Add the resolved file and continue the process (git rebase --continue).

## 8. Merging to Main
After the PR is approved and all automated tests pass, the branch is merged into main.

Standard merge methods:
*   Merge Commit: Preserves the entire history of the branch.
*   Squash and Merge: Combines all commits from the branch into a single commit on main (cleaner history).
*   Rebase and Merge: Moves the commits to the tip of main.

## 9. Cleanup
After a successful merge, the feature branch is deleted both locally and remotely to prevent repository clutter.

```bash
git branch -d feature/name-of-feature
git push origin --delete feature/name-of-feature
```
