import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Check, Link, FileText, Download } from "lucide-react";
import { toast } from "sonner";

interface ExportBriefingProps {
  insightId?: string;
  title?: string;
  narrative?: string;
  location?: string;
  timeframe?: string;
}

const ExportBriefing = ({
  insightId,
  title = "Urban Heat Exposure Analysis",
  narrative = "",
  location = "Nairobi Metro",
  timeframe = "Q2 2026 — Q4 2027",
}: ExportBriefingProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const generateShareableLink = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    if (insightId) params.set("insight", insightId);
    return `${baseUrl}?${params.toString()}`;
  };

  const generateTextSummary = () => {
    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ATLAS BRIEFING — ${title.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location: ${location}
Timeframe: ${timeframe}
Generated: ${new Date().toISOString().split('T')[0]}

SUMMARY
${narrative || "No narrative available."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Powered by Atlas Human Cognitive Interface
${window.location.origin}
`.trim();
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleCopyLink = () => {
    copyToClipboard(generateShareableLink(), "link");
  };

  const handleCopySummary = () => {
    copyToClipboard(generateTextSummary(), "summary");
  };

  const handleDownload = () => {
    const summary = generateTextSummary();
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `atlas-briefing-${location.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Briefing downloaded");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-lg border border-border bg-card p-4 sm:p-6"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Share2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-foreground">
            Export & Share
          </h2>
          <p className="text-xs text-muted-foreground">
            Share this briefing with stakeholders
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3 text-left transition-colors hover:bg-secondary/50"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            {copied === "link" ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Link className="h-4 w-4 text-primary" />
            )}
          </div>
          <div>
            <span className="block text-sm font-medium text-foreground">
              Copy Link
            </span>
            <span className="text-[10px] text-muted-foreground">
              Shareable URL
            </span>
          </div>
        </button>

        {/* Copy Summary */}
        <button
          onClick={handleCopySummary}
          className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3 text-left transition-colors hover:bg-secondary/50"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            {copied === "summary" ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Copy className="h-4 w-4 text-primary" />
            )}
          </div>
          <div>
            <span className="block text-sm font-medium text-foreground">
              Copy Text
            </span>
            <span className="text-[10px] text-muted-foreground">
              Plain text summary
            </span>
          </div>
        </button>

        {/* Download */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3 text-left transition-colors hover:bg-secondary/50"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <Download className="h-4 w-4 text-primary" />
          </div>
          <div>
            <span className="block text-sm font-medium text-foreground">
              Download
            </span>
            <span className="text-[10px] text-muted-foreground">
              Save as .txt file
            </span>
          </div>
        </button>
      </div>

      <div className="mt-4 rounded-md border border-border bg-secondary/20 p-3">
        <div className="flex items-start gap-2">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Exported briefings include the current analysis state, key metrics,
            and recommendations. Links automatically update when the underlying
            data changes.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default ExportBriefing;
