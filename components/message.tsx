export default function Message(
  { title, subline, children }: {
    title?: string;
    subline?: string;
    children?: ChildNode;
  },
) {
  return (
    <div class="grow flex flex-col items-center justify-center">
      <h3>{title}</h3>
      <p>{subline}</p>
      <div>
        {children}
      </div>
    </div>
  );
}
