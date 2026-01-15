# Code Convention Checking System

This project uses ESLint and Prettier to maintain consistent code quality and formatting across the codebase.

## Tools

### ESLint
- **Purpose**: Enforces code quality rules and catches potential bugs
- **Config**: `eslint.config.js`
- **Plugins**:
  - `@typescript-eslint` - TypeScript-specific linting rules
  - `eslint-plugin-svelte` - Svelte-specific linting rules

### Prettier
- **Purpose**: Enforces consistent code formatting
- **Config**: `.prettierrc`
- **Plugins**:
  - `prettier-plugin-svelte` - Svelte formatting support

## Available Scripts

### Linting
```bash
# Check for code quality issues
npm run lint

# Automatically fix linting issues where possible
npm run lint:fix
```

### Formatting
```bash
# Check if code is properly formatted
npm run format:check

# Automatically format all code
npm run format
```

### Type Checking
```bash
# Run Svelte and TypeScript type checking
npm run check

# Run type checking in watch mode
npm run check:watch
```

## Code Conventions

### TypeScript Rules
- Use `const` for variables that don't change
- Use TypeScript types and interfaces
- Avoid using `any` type (warns if used)
- Use consistent import types
- Parameters starting with `_` are allowed to be unused

### General Rules
- Use double quotes for strings
- 2 spaces for indentation
- Semicolons required
- 100 character line width
- LF line endings
- Trailing commas in ES5 style

### Before Committing
Always run the following commands before committing:
```bash
npm run lint:fix    # Fix linting issues
npm run format      # Format code
npm run check       # Type check
```

## Integration with CI/CD

You can add these checks to your CI/CD pipeline to ensure code quality:

```yaml
# Example GitHub Actions workflow
- name: Lint
  run: npm run lint
  
- name: Format Check
  run: npm run format:check
  
- name: Type Check
  run: npm run check
```

## IDE Integration

### VS Code
Install these extensions for automatic linting and formatting:
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Svelte for VS Code (`svelte.svelte-vscode`)

Add to your `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
