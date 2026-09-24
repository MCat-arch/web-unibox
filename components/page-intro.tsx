import { Text, type Copy } from "@/components/text";

interface PageIntroProps {
  eyebrow: Copy;
  title: Copy;
  description: Copy;
}

/** Ice-colored page banner used at the top of every sub-page. */
export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="border-b border-border bg-ice">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
        <p className="section-label">
          <Text>{eyebrow}</Text>
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
          <Text>{title}</Text>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          <Text>{description}</Text>
        </p>
      </div>
    </section>
  );
}
