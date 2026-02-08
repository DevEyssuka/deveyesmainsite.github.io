import { Section } from "../ui/Section";
import { Card } from "../ui/Card";

export function ReleasesSection({ t }) {
  return (
    <Section>
      <div className="space-y-3">
        <Card>
          <h2 className="mb-2 text-lg font-semibold text-cyan-100">{t.releases.title}</h2>
          <p className="text-sm text-cyan-200/80">{t.releases.none}</p>
        </Card>
      </div>
    </Section>
  );
}
