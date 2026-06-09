const FORM_URL =
  "https://staunchventures.notion.site/37a4b863dd4780e587d5e829b90a9df3";

export function DemoBanner() {
  return (
    <div className="w-full bg-orange-500/10 border-b border-orange-500/20 px-4 py-2 text-center text-xs text-orange-300/90">
      This is a demo —{" "}
      <a
        href={FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 font-medium text-orange-300 hover:text-orange-200 transition-colors"
      >
        register your interest here
      </a>
    </div>
  );
}
