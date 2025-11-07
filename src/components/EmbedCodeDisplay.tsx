"use client";

import { Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmbedCodeDisplayProps {
  format: "html" | "markdown" | "bbcode";
  code: string;
  onCopy: (text: string) => void;
  copied: boolean;
}

export default function EmbedCodeDisplay({
  format,
  code,
  onCopy,
  copied,
}: EmbedCodeDisplayProps) {
  const formatLabels = {
    html: "HTML",
    markdown: "Markdown",
    bbcode: "BBCode",
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          {formatLabels[format]}
        </h3>
        <Button
          onClick={() => onCopy(code)}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className=" border  rounded-lg p-4 overflow-x-auto text-sm  font-mono">
        <code>{code}</code>
      </pre>
    </Card>
  );
}
