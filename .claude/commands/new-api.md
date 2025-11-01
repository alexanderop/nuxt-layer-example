# Create a new API endpoint

Create a new API endpoint in the `server/api/` directory.

**Nuxt Server API conventions:**
- Files in `server/api/` become API endpoints
- Use `defineEventHandler` for handling requests
- Route params use `[param]` syntax in filenames
- Methods can be specified with `.get.ts`, `.post.ts`, etc.

Ask the user for:
1. Endpoint path (e.g., "users", "posts/[id]")
2. HTTP method (GET, POST, PUT, DELETE)
3. What the endpoint should do

Then create the endpoint file with:
- Proper TypeScript types
- `defineEventHandler` wrapper
- Request/response handling
- Error handling with proper HTTP status codes
