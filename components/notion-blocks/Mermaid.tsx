import { useEffect, useRef, useState, RefObject } from 'react'
import mermaid from 'mermaid'
import useTheme from '@/lib/theme'
import { getTextContent } from 'notion-utils'
import {Block} from 'notion-types'

// Assuming a type for the block. Update this to the correct type based on your implementation


interface MermaidProps {
  block: Block;
}

export default function Mermaid ({ block }: MermaidProps) {
  const { dark } = useTheme()

  useEffect(() => {
    mermaid.initialize({ theme: dark ? 'dark' : 'neutral' })
  }, [dark])

  const source: string = getTextContent(block.properties.title)
  const container: RefObject<HTMLDivElement> = useRef(null)
  const [svg, setSVG] = useState<string>('')

  useEffect(() => {
    mermaid.render(`mermaid-${block.id}`, source, (container.current as HTMLDivElement))
      .then(({ svg }) => setSVG(svg))
  }, [block, source])

  return (
    <div
      ref={container}
      className="w-full leading-normal flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
