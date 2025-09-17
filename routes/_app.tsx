import { Partial } from "fresh/runtime";
import { define } from "../utils/utils.ts";

export default define.page((ctx) => {
  return (
    <html lang="de">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.7/dist/htmx.js"
          integrity="sha384-yWakaGAFicqusuwOYEmoRjLNOC+6OFsdmwC2lbGQaRELtuVEqNzt11c2J711DeCZ"
          crossorigin="anonymous"
        >
        </script>
        <script
          src="https://cdn.jsdelivr.net/npm/htmx-ext-sse@2.2.2"
          crossorigin="anonymous"
        >
        </script>

        <title>fresh-to-do</title>
      </head>
      <body class="bg-gray-100 min-h-screen pb-24 flex flex-col ">
        {/* Toast container for notifications */}
        <div
          id="toast-container"
          class="fixed"
        >
        </div>

        <Partial f-client-nav name="body">
          <ctx.Component />
        </Partial>
      </body>
    </html>
  );
});
