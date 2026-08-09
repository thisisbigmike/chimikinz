'use client'

import { UserPlus, X } from 'lucide-react'
import { useUser } from '@/lib/context/user-context'
import { site } from '@/lib/site'

export function FollowModal() {
  const { isFollowModalOpen, closeFollowModal, completeQuest } = useUser()

  if (!isFollowModalOpen) return null

  const handleFollow = () => {
    window.open(site.links.xFollowIntent, '_blank', 'noopener,noreferrer')
    completeQuest('x-follow', 150)
    closeFollowModal()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-black border-4 border-foreground p-8 flex flex-col items-center text-center gap-6 shadow-2xl relative pixel-box-lg">
        {/* Close X button top right */}
        <button
          type="button"
          onClick={closeFollowModal}
          aria-label="Close modal"
          className="absolute right-4 top-4 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* User Plus Blue Icon */}
        <div className="size-16 rounded-full bg-[#1d9bf0]/10 border-2 border-[#1d9bf0]/30 grid place-items-center mt-2">
          <UserPlus className="size-8 text-[#1d9bf0]" />
        </div>

        {/* Question Heading */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-white max-w-[260px] leading-snug">
            Do you want to follow @chimikinzzz?
          </h3>
          <p className="text-sm text-neutral-400">
            Get official announcements, giveaways, and early oddling teasers on X.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full mt-2">
          <button
            type="button"
            onClick={handleFollow}
            className="w-full bg-white text-black hover:bg-neutral-200 font-bold py-3.5 px-6 rounded-full font-display text-xs uppercase tracking-tight transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2"
          >
            Follow @chimikinzzz
          </button>

          <button
            type="button"
            onClick={closeFollowModal}
            className="w-full bg-transparent text-white border-2 border-neutral-700 hover:bg-neutral-900 font-bold py-3.5 px-6 rounded-full font-display text-xs uppercase tracking-tight transition-all duration-200 active:scale-95"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
