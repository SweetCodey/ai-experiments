# Bugbot Rules for Flask Backend

## Security
- Never trust raw input, always validate `request.form` and `request.args`.
- No string-interpolated SQL queries; use parameterized queries or ORM.

## Reliability
- Always return proper HTTP status codes (200, 400, 500).
- Ensure all routes handle unexpected inputs gracefully.

## Style
- Keep function names snake_case.
