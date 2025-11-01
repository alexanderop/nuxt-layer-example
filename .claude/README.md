# Claude Code Configuration

This directory contains Claude Code configuration files for this project.

## Files

### `commands/`
Custom slash commands that appear in the `/` menu. Each `.md` file becomes a command.

Available commands:
- `/new-page` - Create a new Nuxt page with proper TypeScript setup
- `/new-component` - Create a new Vue component
- `/new-api` - Create a new API endpoint
- `/check` - Run build and lint checks

### `settings.local.json`
Your personal tool permissions (already in .gitignore). This file is specific to your machine.

To share tool permissions with the team, create a `settings.json` file (not .local).

## Adding New Commands

Create a new `.md` file in the `commands/` directory:

```bash
touch .claude/commands/my-command.md
```

Then use it with `/my-command` in Claude Code.

## Learn More

- [Claude Code Documentation](https://docs.claude.com/claude-code)
- [Custom Commands Guide](https://docs.claude.com/claude-code/custom-commands)
