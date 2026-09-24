import { Text, type Copy } from "@/components/text";

interface SectionHeadingProps {
  eyebrow: Copy;
  title: Copy;
  body?: Copy;
}

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="section-label">
        <Text>{eyebrow}</Text>
      </p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
        <Text>{title}</Text>
      </h2>
      {body && (
        <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
          <Text>{body}</Text>
        </p>
      )}
    </div>
  );
}
