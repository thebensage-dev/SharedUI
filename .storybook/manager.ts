import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";
import { palette } from "../src/lib/palette.ts";

const { Brand, Neutrals } = palette;

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "TheBensage UI",
    colorPrimary: Brand.primary.dark,
    // primary-ink: lighter on the dark chrome, so selected items stay readable (WCAG AA).
    colorSecondary: Brand["primary-ink"].dark,
    appBg: Neutrals.background.dark,
    appContentBg: Neutrals.surface.dark,
    appPreviewBg: Neutrals.background.dark,
    appBorderColor: Neutrals.border.dark,
    textColor: Neutrals.foreground.dark,
    textMutedColor: Neutrals["foreground-muted"].dark,
    barBg: Neutrals.surface.dark,
    barTextColor: Neutrals["foreground-muted"].dark,
    barSelectedColor: Brand["primary-ink"].dark,
    inputBg: Neutrals.background.dark,
    inputBorder: Neutrals["border-strong"].dark,
    inputTextColor: Neutrals.foreground.dark,
  }),
});
