# Figma Data Fetching Instructions

## Overview

This document provides instructions for fetching Figma design data using the Figma MCP server, with special attention to pagination for large files.

## MCP Server Capabilities

The Figma MCP server provides two main functions:

1. `get_figma_data` - Fetch design data from Figma files
2. `download_figma_images` - Download SVG/PNG images from Figma nodes

## File Key Extraction

To extract the file key from a Figma URL:

```
URL: https://www.figma.com/design/JGbNDACv3TwjUQN9BDpUeh/BO-Admin?node-id=3421-116076&t=T2CUNRB2ERgku2X6-4
File Key: JGbNDACv3TwjUQN9BDpUeh
Node ID: 3421-116076 (optional)
```

## Pagination Strategy for Large Files

### When to Use Pagination

Use pagination when:

- Fetching entire Figma files (not specific nodes)
- Files contain 100+ nodes/components
- Responses might exceed token limits
- Working with complex design systems

### Pagination Parameters

```javascript
{
  fileKey: "YOUR_FILE_KEY",
  page: 1,                    // Start with page 1
  pageSize: 100,             // Nodes per page (recommended: 50-100)
  includeMetadata: true      // First page: include metadata
}
```

### Sequential Page Fetching Pattern

```javascript
// First page - get metadata
const firstPage = await get_figma_data({
  fileKey: "FILE_KEY",
  page: 1,
  pageSize: 100,
  includeMetadata: true,
});

// Check if more pages exist
if (firstPage.metadata?.pagination?.hasNextPage) {
  const totalPages = firstPage.metadata.pagination.totalPages;

  // Fetch remaining pages
  for (let page = 2; page <= totalPages; page++) {
    const nextPage = await get_figma_data({
      fileKey: "FILE_KEY",
      page: page,
      pageSize: 100,
      includeMetadata: false, // Subsequent pages: exclude metadata
    });
    // Process nextPage data...
  }
}
```

## Fetching Patterns

### Pattern 1: Specific Node (Recommended for Components)

```javascript
// Fetch single component/screen
const nodeData = await get_figma_data({
  fileKey: "FILE_KEY",
  nodeId: "3421-116076", // Specific node ID
  depth: 5, // How deep to traverse children
});
```

### Pattern 2: Entire File with Pagination

```javascript
// Fetch complete design system
await fetchEntireFile("FILE_KEY");

async function fetchEntireFile(fileKey) {
  const allData = {
    metadata: null,
    nodes: [],
    components: {},
    globalVars: {},
  };

  // First page
  const firstPage = await get_figma_data({
    fileKey,
    page: 1,
    pageSize: 100,
    includeMetadata: true,
  });

  allData.metadata = firstPage.metadata;
  allData.nodes.push(...firstPage.nodes);

  // Remaining pages
  if (firstPage.metadata?.pagination?.hasNextPage) {
    const totalPages = firstPage.metadata.pagination.totalPages;

    for (let page = 2; page <= totalPages; page++) {
      const pageData = await get_figma_data({
        fileKey,
        page,
        pageSize: 100,
        includeMetadata: false,
      });

      allData.nodes.push(...pageData.nodes);
    }
  }

  return allData;
}
```

### Pattern 3: Progress Indicator for Large Files

```javascript
async function fetchWithProgress(fileKey, onUpdate) {
  const firstPage = await get_figma_data({
    fileKey,
    page: 1,
    pageSize: 100,
    includeMetadata: true,
  });

  const totalPages = firstPage.metadata?.pagination?.totalPages || 1;
  let allNodes = [...firstPage.nodes];

  onUpdate?.(1, totalPages, `Page 1/${totalPages}`);

  for (let page = 2; page <= totalPages; page++) {
    const pageData = await get_figma_data({
      fileKey,
      page,
      pageSize: 100,
      includeMetadata: false,
    });

    allNodes.push(...pageData.nodes);
    onUpdate?.(page, totalPages, `Page ${page}/${totalPages}`);
  }

  return {
    ...firstPage,
    nodes: allNodes,
  };
}
```

## Best Practices

### 1. Always Check File Size First

```javascript
// Get basic info first to determine if pagination is needed
const preview = await get_figma_data({
  fileKey: "FILE_KEY",
  page: 1,
  pageSize: 10, // Small preview
  includeMetadata: true,
});

const totalNodes = preview.metadata?.pagination?.totalNodes;
const needsPagination = totalNodes > 100;
```

### 2. Error Handling

```javascript
async function safeFetchFigData(fileKey, options = {}) {
  try {
    return await get_figma_data({
      fileKey,
      page: 1,
      pageSize: 100,
      includeMetadata: true,
      ...options,
    });
  } catch (error) {
    if (error.message.includes("too large")) {
      // Retry with smaller page size
      return await safeFetchFigData(fileKey, {
        ...options,
        pageSize: 50,
      });
    }
    throw error;
  }
}
```

### 3. Memory Management

```javascript
// For very large files, process pages incrementally
async function processLargeFile(fileKey, processor) {
  const firstPage = await get_figma_data({
    fileKey,
    page: 1,
    pageSize: 100,
    includeMetadata: true,
  });

  // Process first page
  await processor(firstPage);

  // Process remaining pages one at a time
  if (firstPage.metadata?.pagination?.hasNextPage) {
    const totalPages = firstPage.metadata.pagination.totalPages;

    for (let page = 2; page <= totalPages; page++) {
      const pageData = await get_figma_data({
        fileKey,
        page,
        pageSize: 100,
        includeMetadata: false,
      });

      await processor(pageData);
    }
  }
}
```

## Response Structure

### Pagination Metadata Example

```javascript
{
  "metadata": {
    "pagination": {
      "page": 1,
      "pageSize": 100,
      "totalNodes": 523,
      "totalPages": 6,
      "hasNextPage": true
    }
  },
  "nodes": [...], // Current page nodes
  "components": {...},
  "globalVars": {...}
}
```

## File Naming Convention

Save fetched data with descriptive names:

- `figma_[screen_name].json` - For specific screens
- `figma_[component_type].json` - For component libraries
- `figma_complete_[timestamp].json` - For complete files

## Implementation Checklist

- [ ] Extract file key from URL correctly
- [ ] Determine if pagination is needed
- [ ] Use `includeMetadata: true` for first page only
- [ ] Handle pagination loop properly
- [ ] Save data with appropriate filename
- [ ] Include error handling for large files
- [ ] Consider memory usage for very large files

## Common Issues & Solutions

### Issue: Token limit exceeded

**Solution**: Reduce `pageSize` and increase pagination

### Issue: Missing node data

**Solution**: Increase `depth` parameter for nested components

### Issue: Slow performance

**Solution**: Use `nodeId` for specific components instead of entire file

### Issue: Incomplete data

**Solution**: Verify all pages are fetched using `totalPages` from metadata
