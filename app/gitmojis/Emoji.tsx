'use client';

import toast from "react-hot-toast";

export interface EmojiProps {
    emoji: string
    entity: string
    code: string
    description: string
    name: string
    semver: string | null
    color: string
}

export default function Emoji({ emoji }: { emoji: EmojiProps }) {

    const copyEmoji = (icon: string) => {
        navigator.clipboard.writeText(icon)
        toast(`已复制！`, { position: 'top-right', icon })
    }

    const copyEmojiCode = (code: string) => {
        navigator.clipboard.writeText(code)
        toast(`已复制！`, { position: 'top-right', icon: <code className="px-2 py-1 text-xs bg-gray-100 text-red-500 rounded-md">{code}</code> })
    }

    return (
        <div key={emoji.name} className="gitmoji-card">
            <div
                className="rounded-t-lg w-full py-14 mb-6 cursor-pointer " style={{ backgroundColor: emoji.color }}
                onClick={() => copyEmoji(emoji.emoji)}
            >
                <div className="text-7xl select-none">{emoji.emoji}</div>
            </div>
            <p
                className="gitmoji-code"
                onClick={() => copyEmojiCode(emoji.code)}
            >{emoji.code}</p>
            <p className="gitmoji-desc">{emoji.description}</p>
        </div>
    )
}