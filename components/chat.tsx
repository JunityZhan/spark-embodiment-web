'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {useEffect, useState} from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const { messages, append, reload, stop, isLoading, input, setInput, setMessages } =
    useChat({
      initialMessages,
      id,
      api: '/python/api/chat',
      body: {
        id,
        previewToken
      },
      onResponse(response) {

        if (response.status === 401) {
          toast.error(response.statusText)
        }
        if (response.status === 403) {
            fetch('/python/api/conclude', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // 传递messages过去
                body: JSON.stringify({ messages })
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => {
                const newMessage : Message = {
                    id: id || new Date().toISOString(), // 使用时间戳作为唯一ID
                    role: 'system', // 或者 'assistant'
                    content: data.content
                };
                setMessages([...messages, newMessage]);
            })
        }

        // 从/python/api/chat2获取数据
      },
      onFinish(message) {
          fetch('/python/api/chat2', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ message })
          })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(data => {
                  console.log(data)
                  append({
                      content: data.content,
                      role: 'user'
                  });
              })
              .catch(error => {
                  fetch('/python/api/conclude', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      // 传递messages过去
                      body: JSON.stringify({ messages })
                  }).then(response => {
                      if (!response.ok) {
                          throw new Error('Network response was not ok');
                      }
                      return response.json();
                  }).then(data => {
                      const newMessage : Message = {
                          id: id || new Date().toISOString(), // 使用时间戳作为唯一ID
                          role: 'system', // 或者 'assistant'
                          content: data.content
                      };
                      setMessages([...messages, newMessage]);
                  })
              });
      }
    })
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
