I want to completely remove the `DotNavigation` component and all of its associated code from my project. Please perform a clean refactor ensuring absolutely no dead code, unused states, or ghost imports are left behind.

Please check and clean up the following areas:

1. **Component File:** Completely delete or deprecate the `DotNavigation.tsx` component file if it's isolated.
2. **Layout/Page Integration (Main Target):** In `layout.tsx`, `page.tsx`, or whichever parent component renders `<DotNavigation />`:
   - Remove the `<DotNavigation />` JSX tag.
   - Remove the `import DotNavigation from ...` line.
   - Look for any active section states, scroll listeners, or references (e.g., `activeSection`, `setActiveSection`) that were used EXCLUSIVELY to power the dots, and completely remove them if no other component is using them.
3. **Global Styles / Tailwind:** If there are custom CSS classes specifically created for the dots navigation in `globals.css` or component modules, clean them up as well.

Please output the refactored parent component files where the dot navigation was integrated, ensuring the code remains clean, optimized, and fully functional without errors.

[DO NOT USE THE AGENT RUNNER / TERMINAL COMMANDS]
Please act ONLY as a direct code assistant in this chat window. Do not execute terminal scripts, do not attempt to auto-run a shell command, and do not use the terminal-based interactive diff writer. 

Simply analyze the files provided, and output the exact code changes or the fully refactored component here directly in the chat response using standard markdown code blocks, so I can review it and hit the normal "Apply" button manually.