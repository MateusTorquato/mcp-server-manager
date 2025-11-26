import { defineConfig } from "vitepress";

export default defineConfig({
  title: "MCP Server Manager",
  description:
    "The all-in-one CLI tool to manage your MCP servers across all clients",
  base: "/mcp-server-manager/",
  ignoreDeadLinks: true,

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    ["meta", { name: "theme-color", content: "#6366f1" }],
  ],

  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "MCP Server Manager",
    appearance: false, // Disable dark/light mode toggle

    nav: [
      { text: "Guide", link: "/docs/guide/getting-started" },
      { text: "CLI Reference", link: "/docs/cli/servers" },
      { text: "TUI", link: "/docs/tui/overview" },
      {
        text: "Links",
        items: [
          { text: "GitHub", link: "https://github.com/MateusTorquato/mcp-server-manager" },
          { text: "NPM", link: "https://www.npmjs.com/package/mcp-server-manager" },
        ],
      },
    ],

    sidebar: {
      "/docs/guide/": [
        {
          text: "Getting Started",
          items: [
            { text: "Introduction", link: "/docs/guide/getting-started" },
            { text: "Installation", link: "/docs/guide/installation" },
            { text: "Quick Start", link: "/docs/guide/quickstart" },
            { text: "Configuration", link: "/docs/guide/configuration" },
          ],
        },
        {
          text: "Guides",
          items: [
            { text: "Advanced Examples", link: "/docs/guide/advanced-examples" },
            { text: "Migration", link: "/docs/guide/migration" },
            { text: "Troubleshooting", link: "/docs/guide/troubleshooting" },
          ],
        },
      ],
      "/docs/cli/": [
        {
          text: "CLI Commands",
          items: [
            { text: "Server Management", link: "/docs/cli/servers" },
            { text: "Client Sync", link: "/docs/cli/clients" },
            { text: "Tools", link: "/docs/cli/tools" },
            { text: "Profiles", link: "/docs/cli/profiles" },
            { text: "Import & Export", link: "/docs/cli/import-export" },
            { text: "Daemon", link: "/docs/cli/daemon" },
            { text: "Authentication", link: "/docs/cli/auth" },
            { text: "Settings", link: "/docs/cli/settings" },
            { text: "Utilities", link: "/docs/cli/utilities" },
          ],
        },
      ],
      "/docs/tui/": [
        {
          text: "Interactive TUI",
          items: [
            { text: "Overview", link: "/docs/tui/overview" },
            { text: "Keyboard Shortcuts", link: "/docs/tui/shortcuts" },
            { text: "Screens", link: "/docs/tui/screens" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/MateusTorquato/mcp-server-manager" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025 Mateus Torquato",
    },

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/MateusTorquato/mcp-server-manager/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});
