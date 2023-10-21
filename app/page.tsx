import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import {useMemo} from "react";

export const runtime = 'edge'

export default function IndexPage() {
  const id = useMemo(() => nanoid(), []);
  return <Chat id={id} />
}
