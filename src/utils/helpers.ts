import { PLATFORM_RULES } from "@/data/constants";

export function extractPostId(url: string) {
  const matchedKey = Object.keys(PLATFORM_RULES).find(key => url.includes(key));
  const rules = matchedKey ? PLATFORM_RULES[matchedKey] : [];

  for (const { regex } of rules) {
    const match = url.match(regex);
    if (match) return match[1] ;
  }

  return url.split("/").filter(Boolean).pop() ?? "" ;
}

export const formatDate = (date: string | undefined): string | undefined => {
  if (!date) return undefined;
  const d = new Date(date);
  if (isNaN(d.getTime())) return undefined;
  return d.toISOString().replace("Z", "").padEnd(26, "0");
};
