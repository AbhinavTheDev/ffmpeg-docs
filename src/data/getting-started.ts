import type { Article } from '../types';

export const gettingStarted: Article[] = [
    {
        id: "gs-1",
        slug: "installation",
        title: "Installation",
        date: "02/08/2026",
        description: "Install FFmpeg on your system and verify your setup.",
        content: `## What is FFmpeg?

FFmpeg is a powerful multimedia framework that can process almost all audio and video formats. It includes three main tools:
- **ffmpeg** - For processing media files
- **ffprobe** - For displaying media information
- **ffplay** - For playing media files


## System Requirements

| Build Type | Windows Version Required |
|------------|-------------------------|
| Essentials | Windows 7 or later |
| Full | Windows 10 or later |

> **Tip:** For most users and applications like Krita or Blender, the **Essentials** build is sufficient.

## Method 1: Install Using Package Manager (Recommended)

Choose a package manager and run the command:

[[INSTALL_TABS]]

## Method 2: Manual Installation

### Step 1: Download FFmpeg

1. Visit the official download page: **https://www.gyan.dev/ffmpeg/builds/**

2. Download one of these packages:
   - \`ffmpeg-release-essentials.zip\` (Recommended for most users)
   - \`ffmpeg-release-full.7z\` (For advanced users needing all features)

> **Note:** Use [7-Zip](https://www.7-zip.org/) to extract \`.7z\` files.

### Step 2: Extract the Archive

1. Right-click the downloaded file
2. Select **Extract All** (for .zip) or **7-Zip → Extract Here** (for .7z)
3. Move the extracted folder to a permanent location, for example:
   \`\`\`bash
   C:/ffmpeg
   \`\`\`

### Step 3: Add FFmpeg to System PATH

1. Press \`Win + R\`, type \`sysdm.cpl\`, and press Enter

2. Go to **Advanced** tab → Click **Environment Variables**

3. Under **System variables**, find and select **Path**, then click **Edit**

4. Click **New** and add the path to FFmpeg's bin folder:
   \`\`\`bash
   C:/ffmpeg/bin
   \`\`\`

5. Click **OK** on all windows to save

### Step 4: Verify Installation

1. Open a **new** Command Prompt window

2. Run the following command:
   \`\`\`bash
   ffmpeg -version
   \`\`\`

3. If installed correctly, you will see version information displayed


## Verify Other Tools

**Check ffprobe:**
\`\`\`bash
ffprobe -version
\`\`\`

**Check ffplay:**
\`\`\`bash
ffplay -version
\`\`\`


## Build Types Explained

| Build | Description |
|-------|-------------|
| **Essentials** | Contains commonly used libraries; suitable for most users |
| **Full** | Contains all available libraries; for advanced use cases |
| **Full Shared** | Full build with separate DLL files; for development purposes |


## Quick Reference Commands

| Task | Command |
|------|---------|
| Check FFmpeg version | \`ffmpeg -version\` |
| Get help | \`ffmpeg -h\` |
| List supported formats | \`ffmpeg -formats\` |
| List supported codecs | \`ffmpeg -codecs\` |



## Troubleshooting

**"ffmpeg is not recognized" error:**
- Ensure the PATH was added correctly
- Open a **new** Command Prompt window after adding to PATH
- Verify the bin folder path is correct

**Cannot extract .7z file:**
- Download and install [7-Zip](https://www.7-zip.org/)


## Support & Discussion

- Reddit: https://www.reddit.com/r/ffmpeg/
- Video Production StackExchange: https://video.stackexchange.com/



*Builds provided by Gyan Doshi. Source: https://www.gyan.dev/ffmpeg/builds/* `,
    },
];

