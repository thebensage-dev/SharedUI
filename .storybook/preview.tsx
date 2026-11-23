import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/nextjs-vite";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { colourAttrs, readColours, readTheme } from "../src/lib/theme.ts";
import "./preview.css";

// Same fonts and variables as the apps' root layout.
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code" });
document.documentElement.classList.add(sans.variable, mono.variable);

// Start in the colours and theme a visitor saved on the main site (its cookies are shared with
// ui.<domain> in production). The toolbar still switches the theme.
const cookie = (name: string) =>
  decodeURIComponent(document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1] ?? "");
for (const [name, value] of Object.entries(colourAttrs(readColours(cookie("colours")))))
  document.documentElement.setAttribute(name, value);

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "error" },
    backgrounds: { disable: true },
  },
  decorators: [
    // Same classes the apps put on <html>; "system" leaves it to the OS.
    withThemeByClassName({
      themes: { system: "", light: "light", dark: "dark" },
      defaultTheme: readTheme(cookie("theme")),
      parentSelector: "html",
    }),
  ],
};

export default preview;
