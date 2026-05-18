# BACKLOG — Post-MVP Ideas

This file tracks feature ideas that are **not** part of the MVP scope. Do not implement
these during the MVP build phase. They will be prioritized after Phase 3 validation is complete.

## Post-MVP Features (Phase 4+)

### VS Code Extension
- Right-click on project root → "Generate DevDocs AI Bundle"
- Reads existing codebase context and pre-populates interview
- Outputs bundle directly to `docs/` directory in workspace

### MCP Server Integration
- Claude Desktop MCP server for DevDocs AI
- Allows Claude to read/write documentation bundles during coding sessions
- Auto-sync bundle updates when code changes

### CLI Tool
- `npx devdocs-ai init` — start interview in terminal
- `npx devdocs-ai export` — export bundle to local directory
- `npx devdocs-ai sync` — sync local bundle with DevDocs AI cloud

### GitHub Integration
- GitHub App: auto-generate bundle on repo creation
- PR comments: suggest documentation updates when code changes
- README.md auto-generation from bundle

### Team Collaboration
- Multi-user projects with role-based access
- Comment threads on specific documentation sections
- Version history and diff view for bundle changes
- Team templates and shared system prompts

### Documentation Drift Detection
- Webhook integration: monitor repo for code changes
- AI-powered drift detection: flag when code diverges from docs
- Suggested documentation updates based on code diffs
- Slack/Discord notifications for drift alerts
