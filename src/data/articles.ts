import type { Article } from '../types';

export const articles: Article[] = [
    {
        id: "1",
        slug: "how-to-add-watermark-to-video-ffmpeg",
        title: "How to Add an Image Watermark (Logo) to a Video with FFmpeg",
        date: "11/19/2025",
        description: "Learn to add a logo or image watermark to your videos with FFmpeg. Get the simple command to overlay an image, control its position, and protect your content.",
        content: `Do you want to brand your video creations with a unique logo to protect your copyright? Or maybe you need to embed your brand identity in the videos you publish. This process is commonly known as "watermarking." Forget about expensive or cumbersome software; FFmpeg's filter system allows you to precisely overlay any image onto any position in your video with a single command line.

### Quick Access
Let's say you have a video input.mp4 and a watermark image watermark.png. Want to place the watermark in the top-left corner of the video? Run this command:

\`\`\`bash
ffmpeg -i input.mp4 -i watermark.png -filter_complex "overlay=10:10" output.mp4
\`\`\`

This command will overlay \`watermark.png\` on top of \`input.mp4\` and generate a new watermarked video named \`output.mp4\`.

### The Breakdown
This command introduces one of FFmpeg's most powerful features: \`-filter_complex\`.

- \`ffmpeg\`: The core command.
- \`-i input.mp4\`: Your first input (the video).
- \`-i watermark.png\`: Your second input (the image).
- \`-filter_complex "overlay=10:10"\`: This is where the magic happens. \`overlay\` is the filter, and \`10:10\` are the X and Y coordinates (from the top-left).
- \`output.mp4\`: The name of your new video.

### FAQ & Variations

#### 1. How do I position the watermark in the bottom-right corner?
The \`overlay\` filter provides built-in variables: \`W\` and \`H\` for the main video, \`w\` and \`h\` for the watermark.
To place the watermark in the bottom-right corner (with a 10-pixel margin):
- X coordinate: \`W-w-10\`
- Y coordinate: \`H-h-10\`

Full command:
\`\`\`bash
ffmpeg -i input.mp4 -i watermark.png -filter_complex "overlay=W-w-10:H-h-10" output.mp4
\`\`\`

#### 2. Is the video re-encoded? Will I lose quality?
Yes, watermarking requires re-encoding because it changes pixel data. To maintain high quality, add \`-crf 23\`:
\`\`\`bash
ffmpeg -i input.mp4 -i watermark.png -filter_complex "overlay=W-w-10:H-h-10" -crf 23 output.mp4
\`\`\``
    },
    {
        id: "2",
        slug: "how-to-compress-video-file-size-ffmpeg",
        title: "How to Compress or Reduce Video File Size with FFmpeg",
        date: "11/15/2025",
        description: "Drastically reduce your video file size without losing visible quality. Learn to use FFmpeg's CRF setting to achieve the perfect balance of size and quality.",
        content: `Have you ever faced this problem: you've recorded a high-quality video, but the file size is enormous? FFmpeg offers a nearly perfect solution using the CRF (Constant Rate Factor) parameter.

### Quick Access
To compress a video named \`input.mp4\` while maintaining great visual quality:

\`\`\`bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 23 output.mp4
\`\`\`

### The Breakdown
- \`-vcodec libx264\`: Specifies the H.264 video codec.
- \`-crf 23\`: Sets the Constant Rate Factor. 
  - **18**: Visually lossless.
  - **23**: Default (great balance).
  - **28**: Aggressive compression (noticeable quality loss).

### FAQ & Variations

#### 1. How to speed up the process?
Use the \`-preset\` parameter:
\`\`\`bash
ffmpeg -i input.mp4 -vcodec libx264 -preset veryfast -crf 23 output.mp4
\`\`\`
Presets: \`ultrafast\`, \`superfast\`, \`veryfast\`, \`faster\`, \`fast\`, \`medium\`, \`slow\`, \`slower\`, \`veryslow\`.

#### 2. Use H.265 (HEVC) for even better compression?
\`\`\`bash
ffmpeg -i input.mp4 -vcodec libx265 -crf 28 output.mp4
\`\`\`
H.265 can achieve the same quality at an even smaller file size.`
    },
    {
        id: "3",
        slug: "how-to-cut-video-with-ffmpeg",
        title: "How to Cut or Trim a Video with FFmpeg",
        date: "11/11/2025",
        description: "Learn the fastest and easiest way to cut or trim any video using a simple FFmpeg command. Get the code, understand each parameter, and solve common issues.",
        content: `Knowing how to trim a video is a fundamental skill. Avoid complex editors and do it in a flash with a single command.

### Quick Access
To cut a video starting at 1:00 and ending at 2:00:

\`\`\`bash
ffmpeg -i input.mp4 -ss 00:01:00 -to 00:02:00 -c copy output.mp4
\`\`\`
*Note: \`-c copy\` makes it lightning-fast by avoiding re-encoding.*

### The Breakdown
- \`-ss 00:01:00\`: Start time (HH:MM:SS).
- \`-to 00:02:00\`: End time.
- \`-c copy\`: Copies the video and audio streams directly.

### FAQ & Variations

#### 1. Start time + Duration?
Use \`-t\` instead of \`-to\`:
\`\`\`bash
ffmpeg -i input.mp4 -ss 00:01:00 -t 30 -c copy output.mp4
\`\`\`

#### 2. Black screen at the beginning?
This happens because \`-c copy\` can only cut at keyframes. For a frame-perfect cut, remove \`-c copy\` (this will re-encode):
\`\`\`bash
ffmpeg -i input.mp4 -ss 00:01:00 -to 00:02:00 output.mp4
\`\`\``
    },
    {
        id: "4",
        slug: "how-to-rotate-video-using-ffmpeg",
        title: "How to Rotate a Video 90/180 Degrees with FFmpeg",
        date: "11/03/2025",
        description: "Fix incorrectly oriented videos with FFmpeg. Learn the simple, one-line command to rotate a video 90, 180, or 270 degrees clockwise or counter-clockwise in seconds.",
        content: `Fix vertical videos that play sideways. FFmpeg can get your video standing upright with a single command.

### Quick Access
To rotate 90 degrees clockwise:
\`\`\`bash
ffmpeg -i input.mp4 -vf "transpose=1" output_rotated.mp4
\`\`\`

### The Breakdown
- \`-vf "transpose=N"\`: The video filter for rotation.
  - \`0\`: 90 Counter-Clockwise and Vertical Flip
  - \`1\`: 90 Clockwise
  - \`2\`: 90 Counter-Clockwise
  - \`3\`: 90 Clockwise and Vertical Flip

### FAQ & Variations

#### 1. Rotate 180 degrees (upside down)?
Chain the filter:
\`\`\`bash
ffmpeg -i input.mp4 -vf "transpose=1,transpose=1" output_rotated_180.mp4
\`\`\``
    },
    {
        id: "5",
        slug: "how-to-extract-image-frame-from-video-ffmpeg",
        title: "How to Extract a Frame from a Video with FFmpeg",
        date: "10/23/2025",
        description: "Learn how to take a high-quality screenshot or thumbnail from any video using FFmpeg. This guide provides the simple, one-line command to extract a specific frame as a JPG or PNG.",
        content: `A single command lets you precisely extract a crisp, still image from any point in a video.

### Quick Access
Extract a frame at 15 seconds:
\`\`\`bash
ffmpeg -ss 00:00:15 -i input.mp4 -vframes 1 thumbnail.jpg
\`\`\`

### The Breakdown
- \`-ss 00:00:15\`: Seek to 15 seconds.
- \`-vframes 1\`: Extract exactly one frame.

### FAQ & Variations

#### 1. Control JPEG quality?
Use \`-q:v\` (ranges from 1-31, 2 is high quality):
\`\`\`bash
ffmpeg -ss 00:00:15 -i input.mp4 -vframes 1 -q:v 2 high_quality_thumb.jpg
\`\`\`

#### 2. Extract every 10 seconds?
Use the \`fps\` filter:
\`\`\`bash
ffmpeg -i long_video.mp4 -vf fps=1/10 image_%03d.jpg
\`\`\``
    },
    {
        id: "6",
        slug: "how-to-speed-up-or-slow-down-video-using-ffmpeg",
        title: "How to Speed Up or Slow Down Video with FFmpeg",
        date: "10/22/2025",
        description: "Learn to create stunning timelapse and slow-motion effects by changing video speed with FFmpeg. This guide provides the exact commands and filter explanations for perfect results.",
        content: `Create professional-grade timelapses or slow-motion effects by manipulating presentation timestamps (PTS).

### Quick Access
**Speed Up (2x):**
\`\`\`bash
ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" -an output_fast.mp4
\`\`\`

**Slow Motion (0.5x):**
\`\`\`bash
ffmpeg -i input.mp4 -vf "setpts=2*PTS" -an output_slow.mp4
\`\`\`

### The Breakdown
- \`-vf "setpts=X*PTS"\`: Changes the timing of frames.
- \`-an\`: Removes audio (standard for these commands as audio needs separate processing).

### FAQ & Variations

#### Match Audio Speed?
Use \`atempo\`:
\`\`\`bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" output_2x.mp4
\`\`\``
    },
    {
        id: "7",
        slug: "how-to-merge-videos-using-ffmpeg",
        title: "How to Merge Videos with FFmpeg",
        date: "10/20/2025",
        description: "Discover the fastest ways to merge multiple video files with FFmpeg. Learn both the lossless method for identical formats and the robust filter method for joining any clips.",
        content: `Join multiple clips into a single, seamless video.

### 🚀 Method 1: Lossless (Same Resolution/Codec)
1. Create \`mylist.txt\`:
\`\`\`
file 'clip1.mp4'
file 'clip2.mp4'
\`\`\`
2. Run:
\`\`\`bash
ffmpeg -f concat -safe 0 -i mylist.txt -c copy final.mp4
\`\`\`

### 🚀 Method 2: Universal (Re-encoding)
Use this if clips have different formats:
\`\`\`bash
ffmpeg -i c1.mp4 -i c2.mov -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" final.mp4
\`\`\``
    },
    {
        id: "8",
        slug: "how-to-create-gif-from-video-using-ffmpeg",
        title: "How to Create a High-Quality Animated GIF from Video with FFmpeg",
        date: "10/17/2025",
        description: "Learn to create high-quality animated GIFs from any video using a single FFmpeg command. This guide shows how to control size, frame rate, and optimize colors for perfect GIFs.",
        content: `Create crisp, looping GIFs without watermarks.

### Quick Access
\`\`\`bash
ffmpeg -i input.mp4 -ss 5 -t 3 -vf "fps=15,scale=480:-1" output.gif
\`\`\`

### FAQ & Variations
1. Generate palette:
\`\`\`bash
ffmpeg -i input.mp4 -vf "palettegen" palette.png
\`\`\`
2. Use palette:
\`\`\`bash
ffmpeg -i input.mp4 -i palette.png -filter_complex "[0:v][1:v]paletteuse" output.gif
\`\`\``
    },
    {
        id: "9",
        slug: "how-to-change-video-resolution-using-ffmpeg",
        title: "How to Change Video Resolution with FFmpeg",
        date: "10/16/2025",
        description: "Resize and scale videos effortlessly with FFmpeg. This guide provides the simple command to change a video's resolution while showing you how to maintain the aspect ratio.",
        content: `Scale videos precisely using the \`scale\` filter.

### Quick Access
\`\`\`bash
ffmpeg -i input.mp4 -vf "scale=1280:720" output.mp4
\`\`\`

### Maintain Aspect Ratio
Set one dimension to \`-1\`:
\`\`\`bash
ffmpeg -i input.mp4 -vf "scale=640:-1" output.mp4
\`\`\`

### Dynamic Sizing
\`\`\`bash
ffmpeg -i input.mp4 -vf "scale=iw/2:ih/2" output.mp4
\`\`\``
    },
    {
        id: "10",
        slug: "how-to-extract-audio-from-video-using-ffmpeg",
        title: "How to Extract Audio from Video Using FFmpeg",
        date: "10/15/2025",
        description: "Learn to extract audio from video with a single FFmpeg command. This guide shows you how to easily convert MP4 to MP3 and control the audio quality and bitrate.",
        content: `Convert MP4 to MP3 with a single command.

### Quick Access
\`\`\`bash
ffmpeg -i lecture.mp4 -vn audio.mp3
\`\`\`

### Control Quality
Use \`-ab\` (bitrate):
\`\`\`bash
ffmpeg -i video.mp4 -vn -ab 320k high_quality.mp3
\`\`\``
    },
    {
        id: "11",
        slug: "how-to-convert-video-format-using-ffmpeg",
        title: "How to Convert Video Formats with FFmpeg",
        date: "10/13/2025",
        description: "Effortlessly convert video formats like MOV to MP4 with FFmpeg. Get the one-line command, understand key parameters, and learn to control quality for perfect results.",
        content: `Master format conversion with a single command.

### Quick Access
\`\`\`bash
ffmpeg -i input.mov output.mp4
\`\`\`

### Advanced: Stream Copy (No Re-encoding)
Change container without transcoding (very fast):
\`\`\`bash
ffmpeg -i input.mp4 -c copy output.mkv
\`\`\``
    },
    {
        id: "12",
        slug: "how-to-crop-a-video-using-ffmpeg",
        title: "How to Crop a Video Using FFmpeg",
        date: "10/11/2025",
        description: "Learn the fastest way to crop a video with FFmpeg. This guide provides a direct command, a clear parameter breakdown, and practical examples for precise video cropping.",
        content: `Precisely select which part of the video frame to keep.

### Quick Access
\`\`\`bash
ffmpeg -i input.mp4 -vf "crop=640:480:100:50" output.mp4
\`\`\`
*Format: \`crop=w:h:x:y\`*

### Crop From Center
\`\`\`bash
ffmpeg -i input.mp4 -vf "crop=300:300:(iw-300)/2:(ih-300)/2" center.mp4
\`\`\``
    },
    {
        id: "13",
        slug: "ffmpeg-convert-mp4-to-gif",
        title: "How to Convert MP4 to GIF with FFmpeg",
        date: "10/05/2025",
        description: "Learn the best FFmpeg command to convert MP4 to a high-quality GIF. Our step-by-step guide shows you how to create crisp, smooth animations from video, with no quality loss.",
        content: `Don't settle for blurry online converters.

### Quick Access
\`\`\`bash
ffmpeg -i input.mp4 -vf "fps=15,scale=500:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" output.gif
\`\`\`

### The Breakdown
- \`palettegen\`: Analyzes the unique colors in your video to create a custom 256-color palette.
- \`paletteuse\`: Applies that custom palette for the most vibrant GIF possible.`
    },
    {
        id: "14",
        slug: "ffmpeg-aac-to-mp3",
        title: "How to use FFmpeg Converting AAC to MP3",
        date: "09/28/2025",
        description: "Effortlessly convert AAC to MP3 using FFmpeg with our step-by-step guide. Learn the benefits, prerequisites, and how to troubleshoot common issues.",
        content: `A simple guide to audio format conversion.

### Quick Access
\`\`\`bash
ffmpeg -i input.aac -acodec libmp3lame -ab 192k output.mp3
\`\`\`

### Why AAC to MP3?
MP3 is more universally compatible with older devices, while maintaining a great balance of size and quality.`
    },
];

