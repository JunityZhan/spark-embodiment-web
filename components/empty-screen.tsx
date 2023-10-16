import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { CreateAvatar } from '@/components/create-avatar'

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          社交个人化身
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          这里是一个社交个人化身平台，你可以创建你的个人化身来和别的角色对话。
        </p>
        <p className="leading-normal text-muted-foreground">
          让我们先来创建你的个人化身吧。
        </p>
        {/*<div className="mt-4 flex flex-col items-start space-y-2">*/}
        {/*  {exampleMessages.map((message, index) => (*/}
        {/*    <Button*/}
        {/*      key={index}*/}
        {/*      variant="link"*/}
        {/*      className="h-auto p-0 text-base"*/}
        {/*      onClick={() => setInput(message.message)}*/}
        {/*    >*/}
        {/*      <IconArrowRight className="mr-2 text-muted-foreground" />*/}
        {/*      {message.heading}*/}
        {/*    </Button>*/}
        {/*  ))}*/}
        {/*</div>*/}
        <CreateAvatar></CreateAvatar>
      </div>
    </div>
  )
}
