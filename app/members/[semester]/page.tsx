import { spring2026Members } from "@/data/members/2026-spring";
import { notFound } from "next/navigation";
import type { Spring2026Member } from "@/data/members/2026-spring";

const semesterData: Record<string, { label: string; members: Spring2026Member[] }> = {
  "spring-2026": { label: "Spring 2026", members: spring2026Members },
};

const semesters = Object.keys(semesterData);

const partOrder = ["Soprano", "Alto", "Tenor", "Bass", "Beatbox", "Music Director & 编曲", "Marketing", "Tech", ""];

function groupByCategory(members: Spring2026Member[]) {
  return partOrder.reduce((acc, category) => {
    const group = members.filter((m) => m.category === category);
    if (group.length > 0) acc[category] = group;
    return acc;
  }, {} as Record<string, Spring2026Member[]>);
}

function MemberCard({ member }: { member: Spring2026Member }) {
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900 flex flex-col">
      <div className="w-full aspect-[2/3] overflow-hidden bg-gray-800">
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-center" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">Photo</div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <p className="font-semibold text-white">{member.name}</p>
        {member.school && <p className="text-xs text-gray-400">学校: {member.school}</p>}
        {member.major && <p className="text-xs text-gray-400">专业: {member.major}</p>}
        {member.role && <p className="text-xs text-gray-400">团内职务: {member.role}</p>}
        {member.whatsongyouwerelisteningtenyearsago && (
          <p className="text-xs text-gray-400">十年前的自己在听什么歌: {member.whatsongyouwerelisteningtenyearsago}</p>
        )}
        {member.messageToAudience && (
          <p className="text-xs text-gray-400">想对观众说些什么: {member.messageToAudience}</p>
        )}
        {member.messageToMembers && (
          <p className="text-xs text-gray-400 whitespace-pre-line">想对安可说些什么: {member.messageToMembers}</p>
        )}
      </div>
    </div>
  );
}

function MemberGrid({ members }: { members: Spring2026Member[] }) {
  const grouped = groupByCategory(members);
  if (members.length === 0) return null;

  return (
    <div className="mb-16">
      {Object.entries(grouped).map(([category, group]) => (
        <section key={category} className="mb-12">
          <h3 className="text-xl font-bold mb-5 border-b border-gray-800 pb-2 text-white">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2 text-white">Members</h1>
      <p className="text-gray-500 mb-10">{data.label}</p>
      <MemberGrid members={data.members} />
    </div>
  );
}
