import { type RouterOutputs } from "~/utils/api";

interface RantDisplayProps {
  rant: RouterOutputs["rant"]["getAll"][number];
}

export const RantDisplay: React.FC<RantDisplayProps> = ({ rant }) => {
  return (
    <article className="text-slate-100 p-4 border-slate-100 border-2 rounded-md">
      <h1 className="text-slate-100 border-1 py-2 border-solid font-bold text-2xl">{rant.title}</h1>
      <p>{rant.content}</p>
    </article>
  );
}

