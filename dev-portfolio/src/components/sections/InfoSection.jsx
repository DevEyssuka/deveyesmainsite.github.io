import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { Chip } from "../ui/Chip";

export function InfoSection({ t, lang }) {
  return (
    <Section>
      <div className="space-y-6">
        {/* About Portfolio */}
        <Card>
          <h2 className="mb-3 text-lg font-semibold text-cyan-100">{t.info.title}</h2>
          <p className="text-sm leading-relaxed text-cyan-200/90">{t.info.text}</p>
        </Card>

        {/* Personal Information */}
        <Card>
          <h3 className="mb-4 text-base font-semibold text-cyan-100">{t.info.personalInfo.title}</h3>
          
          <div className="space-y-6">
            {/* About Section */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-200/80">
                {t.info.personalInfo.about}
              </h4>
              <div className="rounded-lg border border-cyan-400/20 bg-zinc-900/40 p-4">
                <p className="text-sm leading-relaxed text-cyan-200/80">
                  {t.info.personalInfo.aboutText}
                </p>
              </div>
            </div>

            {/* Approach Section */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-200/80">
                {t.info.personalInfo.approach}
              </h4>
              <div className="rounded-lg border border-cyan-400/20 bg-zinc-900/40 p-4">
                <p className="text-sm leading-relaxed text-cyan-200/80">
                  {t.info.personalInfo.approachText}
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-200/80">
                {t.info.personalInfo.skills}
              </h4>
              <div className="flex flex-wrap gap-2">
                {t.info.personalInfo.skillsList.map((skill, index) => (
                  <Chip key={index}>{skill}</Chip>
                ))}
              </div>
            </div>

            {/* Goals Section */}
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-cyan-200/80">
                {t.info.personalInfo.goals}
              </h4>
              <div className="rounded-lg border border-cyan-400/20 bg-zinc-900/40 p-4">
                <p className="text-sm leading-relaxed text-cyan-200/80">
                  {t.info.personalInfo.goalsText}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
