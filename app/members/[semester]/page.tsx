import { fall2023Members } from "@/data/members/fall-2023";
import { spring2023Members } from "@/data/members/spring-2023";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Member } from "@/data/members/fall-2023";

const semesterData: Record<string, { label: string; members: Member[] }> = {
  "fall-2023": { label: "Fall 2023 — By the Fireplace", members: fall2023Members },
  "spring-2023": { label: "Spring 2023 — Wild Bloom", members: spring2023Members },
};

const semesters = Object.keys(semesterData);

const partOrder = ["Soprano", "Alto", "Tenor", "Bass", "Beatbox", "Marketing"];

function groupByPart(members: Member[]) {
  return partOrder.reduce((acc, part) => {
    const group = members.filter((m) => m.part === part);
    if (group.length > 0) acc[part] = group;
    return acc;
  }, {} as Record<string, Member[]>);
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="border border-gray-800 rounded-xl p-4 text-center bg-gray-900">
      <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto mb-3 overflow-hidden flex items-center justify-center text-gray-600 text-xs">
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          "Photo"
        )}
      </div>
      <p className="font-semibold text-sm text-white">{member.name}</p>
      <p className="text-xs text-gray-500 mt-0.5">{member.major}</p>
      {member.funFact && (
        <p className="text-xs text-gray-600 mt-2 italic">"{member.funFact}"</p>
      )}
    </div>
  );
}

function MemberGrid({ members, label }: { members: Member[]; label: string }) {
  const grouped = groupByPart(members);
  if (members.length === 0) return null;

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-white">{label}</h2>
      {Object.entries(grouped).map(([part, group]) => (
        <section key={part} className="mb-12">
          <h3 className="text-xl font-bold mb-5 border-b border-gray-800 pb-2 text-white">{part}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {group.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return semesters.map((s) => ({ semester: s }));
}

export default async function MembersPage({
  params,
}: {
  params: Promise<{ semester: string }>;
}) {
  const { semester } = await params;
  const data = semesterData[semester];
  if (!data) notFound();

  const currentMembers = data.members.filter((m) => m.current === true);
  const alumni = data.members.filter((m) => !m.current);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Semester selector */}
      <div className="flex gap-3 mb-10 flex-wrap">
        {semesters.map((s) => (
          <Link
            key={s}
            href={`/members/${s}`}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              s === semester
                ? "bg-white text-gray-900 border-white"
                : "border-gray-700 text-gray-400 hover:border-gray-400 hover:text-gray-200"
            }`}
          >
            {semesterData[s].label.split("—")[0].trim()}
          </Link>
        ))}
      </div>

      <h1 className="text-4xl font-bold mb-2 text-white">Members</h1>
      <p className="text-gray-500 mb-10">{data.label}</p>

      <MemberGrid members={currentMembers} label="Current Members" />
      <MemberGrid members={alumni} label="Alumni" />
    </div>
  );
}
