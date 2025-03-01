"use client";

import type React from "react";
import { useState } from "react";
import { Clipboard, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FacebookIcon,
  TelegramIcon,
  TwitterXIcon,
  WhatsAppIcon,
} from "@/lib/icons";

interface ShareProps {
  url?: string;
  title?: string;
  className?: string;
}

export default function Share({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "Check out this profile",
  className = "",
}: ShareProps) {
  const [copied, setCopied] = useState(false);

  // Copy URL to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Share URLs for different platforms
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  };

  // Open share dialog
  const share = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], "_blank");
  };

  return (
    <div
      className={`flex items-center md:gap-1 gap-2.5 text-gray-600 dark:text-gray-300 ${className}`}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={copyToClipboard}
              className="rounded-full p-2 -mr-1 md:mr-0 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Copy link to clipboard"
            >
              {copied ? (
                <CheckCircle2 className="h-5 w-5 text-sky-500" />
              ) : (
                <Clipboard className="h-5 w-5 p-[1px] md:p-0" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "Copied!" : "Copy link"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => share("facebook")}
              className="rounded-full p-1.5 transition-colors hover:bg-gray-100 hover:text-blue-600"
              aria-label="Share on Facebook"
            >
              {FacebookIcon}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Facebook</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => share("twitter")}
              className="rounded-full p-1.5 transition-colors hover:bg-gray-100 hover:text-blue-400"
              aria-label="Share on Twitter"
            >
              {TwitterXIcon}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Twitter</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => share("whatsapp")}
              className="rounded-full p-1.5 transition-colors hover:bg-gray-100 hover:text-green-500"
              aria-label="Share on WhatsApp"
            >
              {WhatsAppIcon}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on WhatsApp</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => share("telegram")}
              className="rounded-full p-1.5 transition-colors hover:bg-gray-100 hover:text-blue-500"
              aria-label="Share on Telegram"
            >
              {TelegramIcon}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Telegram</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
