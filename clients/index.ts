import { isDev } from "@/constants/development";
interface dataProps {
  level?: "success" | "error" | "warn" | "info";
  debug?: boolean;
  source: string;
  raw?: Object;
}

export function logIt(
  message: string,
  { level = "info", source, debug = false, raw = {} }: dataProps
) {
  if (debug && !isDev) return;

  const colors = {
    success: {
      bg: "#1E1E1E",
      text: "#1CD760",
    },
    error: {
      bg: "#1E1E1E",
      text: "#FF5733",
    },
    warn: {
      bg: "#1E1E1E",
      text: "#FFE857",
    },
    info: {
      bg: "#1E1E1E",
      text: "#23C4FF",
    },
  };

  let thecolor = colors[level];
  if (!thecolor) {
    thecolor = colors["info"];
  }

  console.groupCollapsed(
    `%c[${source}] %c${message}`,
    `color: ${thecolor.text}; font-weight: semibold;`,
    `color: black; font-weight: normal;`
  );

  if (raw) console.log(raw);
  console.log(`Message: ${message}`);
  console.log(`Level: ${level}`);
  console.trace();

  console.groupEnd();
}
