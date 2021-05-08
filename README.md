# module (SSR)

- Forked from the https://github.com/vitali-breida/module9-testing
- Removed dependency to react-scripts (CRA)
- Added webpack5 configuration (client, server) dependent on dev/prod with HMR, babel
- Added "express"
- SSR support of redux state, Material UI css, rouitings, auto-loadable scripts
- "react-loadable" and "react-loadable-ssr-addon" were added/configured
- AddMovieDialog is loaded through react-loadable.
- isomorphic-fetch on server side

There is an issue on production mode with loading of chunks (appears when optimization is swicthed on)
Unfortenately it wasn't much time for deep analysis. 