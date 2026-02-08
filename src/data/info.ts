import type { Article } from '../types';

export const info: Article[] = [
    {
        id: "info-1",
        slug: "not-official",
        title: "Not Official Documentation",
        date: "2025-01-01",
        description: "This site is a community resource and is not affiliated with the official FFmpeg project.",
        content: `FFmpeg is a powerful tool for video processing. While the official low-level documentation can be overwhelming at first, it remains the ultimate source of truth. This community-driven resource is designed to help you get started more easily. As you gain experience, we recommend exploring the official documentation to deepen your understanding.

Please note that this site is for educational purposes and is not the official FFmpeg documentation. For the most accurate and up-to-date information, always refer to the [official FFmpeg website](https://ffmpeg.org).

### Thank You! :)
`

    },
    {
        id: "info-3",
        slug: "ffmpeg-community",
        title: "Community & Resources",
        date: "2025-01-01",
        description: "Connect with the FFmpeg community, report bugs, or contribute to the project.",
        content: `### Community Resources
- **Official Website**: [ffmpeg.org](https://ffmpeg.org)
- **Documentation**: [ffmpeg.org/documentation.html](https://ffmpeg.org/documentation.html)
- **Wiki**: [trac.ffmpeg.org](https://trac.ffmpeg.org)
- **Bug Tracker**: [trac.ffmpeg.org](https://trac.ffmpeg.org)
- **IRC Channels**: #ffmpeg on Libera Chat

### Mailing Lists
- **ffmpeg-user**: General user support and questions.
- **ffmpeg-devel**: FFmpeg development discussions and patches.
- **libav-user**: Development using FFmpeg libraries.`
    }
];