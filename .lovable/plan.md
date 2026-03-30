

## Problem
The Admin Panel sidebar header text overlaps with the site's main Navbar/logo. The sidebar uses `z-40` while the mobile header uses `z-50`, but the main site Navbar likely also uses a high z-index and sits on top of the admin layout.

## Fix
In `src/components/admin/AdminLayout.tsx`:
- Increase sidebar z-index to `z-50` so it sits above the main Navbar
- Increase mobile header z-index to `z-[60]` to stay above the sidebar
- Increase mobile overlay z-index to `z-[45]` accordingly

This ensures the admin sidebar fully covers the public navbar when visible, preventing any overlap.

### Technical Detail
- Line 38: mobile header `z-50` → `z-[60]`
- Line 52: sidebar `z-40` → `z-50`
- Line 115: overlay `z-30` → `z-[45]`

