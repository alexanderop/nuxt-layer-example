# Commit Command

Create a conventional commit with an AI-generated commit message.

## Instructions

1. **Analyze changes**: Run `git status` and `git diff` in parallel to understand:
   - What files have been modified, added, or deleted
   - The actual code changes in those files
   - The scope and nature of the changes

2. **Review recent commits**: Run `git log --oneline -10` to understand the commit message style used in this repository

3. **Determine commit type**: Based on the changes, select the appropriate conventional commit type:
   - `feat`: New feature or functionality
   - `fix`: Bug fix
   - `refactor`: Code refactoring without changing behavior
   - `docs`: Documentation changes only
   - `style`: Code style/formatting changes (white-space, formatting, etc.)
   - `test`: Adding or modifying tests
   - `chore`: Maintenance tasks, dependency updates, configuration changes
   - `perf`: Performance improvements
   - `ci`: CI/CD configuration changes
   - `build`: Build system or external dependency changes
   - `revert`: Reverting a previous commit

4. **Determine scope** (optional but recommended): Identify the area of the codebase affected (e.g., `components`, `api`, `auth`, `ui`, `config`, etc.)

5. **Generate commit message** following this format:
   ```
   type(scope): subject

   body

   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude <noreply@anthropic.com>
   ```

   Where:
   - **subject**: Short description (50 chars max, imperative mood, lowercase, no period)
   - **body** (optional): Detailed explanation of WHAT changed and WHY (wrap at 72 chars)
   - Include the Claude Code footer

6. **Stage and commit**:
   - Add relevant untracked/modified files to staging using `git add`
   - DO NOT stage files that likely contain secrets (.env, credentials.json, etc.)
   - Create the commit using a HEREDOC format for proper formatting
   - Verify the commit with `git status` after completion

7. **Handle pre-commit hooks**: If the commit fails due to pre-commit hook changes, retry ONCE. If files were modified by the hook, verify it's safe to amend (check authorship and that it's not pushed), then amend if safe or create a new commit if not.

## Example commit messages

```
feat(auth): add OAuth2 authentication flow

Implement OAuth2 login with Google and GitHub providers.
Adds new AuthProvider component and useAuth composable.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

```
fix(api): handle null response in user endpoint

Add null checks before accessing user.profile to prevent
TypeError when profile data is missing.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

```
chore(deps): update nuxt to v4.1.0

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Important notes

- Focus on the "why" rather than the "what" in the commit body
- Use imperative mood ("add feature" not "added feature")
- Keep the subject line concise and descriptive
- DO NOT commit without analyzing the changes first
- DO NOT push to remote unless explicitly asked
