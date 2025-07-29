# Agent Guidelines

## Build/Lint/Test Commands

- Start development: `bun run start`
- Build: `bun run build`
- Run tests: `bun test`
- Run single test: `bun test src/path/to/test.test.ts`
- Lint code: `bun run lint`
- Generate PDF: `bun run pdf`

## Code Style Guidelines

- **Imports**: Group React imports first, followed by library
  imports, then local imports
- **Types**: Use TypeScript interfaces for props and explicit type annotations
- **Naming**:
  - Components: PascalCase (e.g., `Contact`, `Experience`)
  - Variables/functions: camelCase
  - Files: lowercase with .tsx extension
- **Component Pattern**: Use functional components with React.FC type
- **Styling**: Use @react-pdf/renderer StyleSheet for styling
- **Error Handling**: Handle optional values with conditional rendering
- **Formatting**:
  - Use 2-space indentation
  - Use semicolons
  - Prefer explicit return types
- **Component Props**: Define props interfaces above components