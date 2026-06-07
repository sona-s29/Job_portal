export const companyLogoUrl = (domain) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const fallbackLogoUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Company")}&background=0F766E&color=fff&bold=true`;
