<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- `src/routes/types.tsx` is a parent layout route and must render `<Outlet />`; the listing lives in `src/routes/types/index.tsx`. Why: a sibling `types/$type.tsx` nests under it, and a parent that paints its own UI hides every `/types/<CODE>` report.
- Colour, radius, and type values live only as tokens in `src/styles.css`; components use semantic utilities. Why: the test surface inverts to an ink background and stays correct only when nothing hardcodes colours.

