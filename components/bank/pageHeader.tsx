import { Head } from "fresh/runtime";
import { ComponentChildren } from "preact";

/**
 * A reusable component for pages to have a conistent header
 * @param title rendered on the page
 * @param pageTitle rendered in the browser tab, fall back is title
 * @param children JSX area for actions
 */

export function PageHeader(
  { title, children, pageTitle }: {
    title?: string;
    children?: ComponentChildren;
    pageTitle?: string;
  },
) {
  return (
    <div class="flex flex-row justify-between items-center py-6">
      <Head>
        <title>{pageTitle ?? title}</title>
      </Head>
      <h1 class="text-2xl font-medium">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
