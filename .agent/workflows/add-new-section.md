---
description: How to add a new study section to the Docusaurus site
---

// turbo-all
# Add New Study Section

This workflow describes the steps to integrate a new study section (e.g., `new_topic_cs`, `new_topic_ts`) into the Docusaurus website.

## Prerequisites

1.  **Content Preparation**: Ensure the documentation files are placed in `website/docs/<topic_name>/`.
2.  **Index File**: Ensure there is an index file (e.g., `website/docs/<topic_name>/<topic_name>_index.md`).

## Steps

### 1. Update `docusaurus.config.ts`

Add the new section to the global navigation bar (`navbar`).

1.  Open `website/docusaurus.config.ts`.
2.  Locate `themeConfig.navbar.items`.
3.  Add a new object for the section:

```typescript
{
  type: 'docSidebar',
  sidebarId: '<topicName>Sidebar', // e.g. newTopicCsSidebar
  position: 'left',
  label: '<Display Label>',        // e.g. New Topic CS Study
},
```

### 2. Update `sidebars.ts`

Define the sidebar structure for the new section.

1.  Open `website/sidebars.ts`.
2.  Add a new property to the `sidebars` object matching the `sidebarId` defined in step 1.
3.  **Check File Count**: Count the number of `.md` files in the `website/docs/<topic_name>/` directory.
    -   **If <= 60 files**: Use the simplified flat structure with `generateProjectSidebar`.
    -   **If > 60 files**: Use the grouped structure with `generateStudyIds`.

#### Option A: 60 Files or Less (Flat Structure)

```typescript
  <topicName>Sidebar: generateProjectSidebar('<topic_name>'),
```

#### Option B: More than 60 Files (Grouped Structure)

```typescript
  <topicName>Sidebar: [
    {
      type: 'doc',
      id: '<topic_name>/<topic_name>_index',
    },
    ...[
      { title: "Part 0：準備と導入", start: 1, end: 1 },
      // ... more chapters
    ].map(mod => ({
      type: 'category' as const,
      label: mod.title,
      items: generateStudyIds('<topic_name>', '<topic_name>', mod.start, mod.end),
    })),
  ],
```

### 3. Update Homepage

Add a card to the homepage features list.

1.  Open `website/src/components/HomepageFeatures/index.tsx`.
2.  Add a new item to the `FeatureList` array.

```typescript
  {
    title: '<Display Title>',
    Svg: require('@site/static/img/<svg_name>.svg').default, // Reuse existing SVGs or add new one
    description: (
      <>
        Description of the study content.<br/>
        Key points.<br/>
      </>
    ),
    link: '/docs/<topic_name>/<topic_name>_index',
  },
```

### 4. Verify

1.  Run `npm run build` in the `website` directory.
2.  Run `npm run start` to verify the site locally.