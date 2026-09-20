import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://whiskas101.dev/",
    mediaUrl: "https://media.whiskas101.dev/",
    title: "whiskas101",
    description: "A very normal blog :)",
    author: "Vikas Chaurasia",
    profile: "https://media.whiskas101.dev/test.svg",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Kolkata",
    dir: "ltr",
  },
  posts: {
    perPage: 8,
    perIndex: 1, // recent posts list
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/whiskas101/gfolio/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/whiskas101" },
    // { name: "x", url: "https://x.com/username" },
    // { name: "linkedin", url: "https://www.linkedin.com/in/username/" },
    { name: "mail", url: "mailto:getintouchwithvic2@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
