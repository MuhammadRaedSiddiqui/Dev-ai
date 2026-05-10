import type { DomainId } from './domains'

/**
 * Domain Completion Detection
 *
 * Parses AI assistant messages to detect when a domain is complete.
 * The AI signals completion with: [DOMAIN_COMPLETE: domain_name]
 */

export interface CompletionSignal {
  detected: boolean
  domainId: DomainId | null
  content: string | null
}

/**
 * Detect if a message contains a domain completion signal
 *
 * Expected format: [DOMAIN_COMPLETE: planning]
 */
export function detectDomainCompletion(message: string): CompletionSignal {
  // Look for completion signal pattern
  const completionPattern = /\[DOMAIN_COMPLETE:\s*(\w+)\]/i
  const match = message.match(completionPattern)

  if (!match) {
    return {
      detected: false,
      domainId: null,
      content: null,
    }
  }

  const domainName = match[1].toLowerCase()

  // Map domain names to IDs
  const domainMap: Record<string, DomainId> = {
    planning: 'planning',
    architecture: 'architecture',
    database: 'database',
    api: 'api',
    environment: 'environment',
    auth: 'auth',
    testing: 'testing',
    monitoring: 'monitoring',
    frontend: 'frontend',
    deployment: 'deployment',
  }

  const domainId = domainMap[domainName]

  if (!domainId) {
    console.warn(`Unknown domain in completion signal: ${domainName}`)
    return {
      detected: false,
      domainId: null,
      content: null,
    }
  }

  // Extract the content (everything before the completion signal)
  const contentBeforeSignal = message.substring(0, match.index).trim()

  return {
    detected: true,
    domainId,
    content: contentBeforeSignal,
  }
}

/**
 * Extract markdown content from a message
 *
 * Looks for markdown code blocks or structured content that represents
 * the generated documentation for a domain.
 */
export function extractMarkdownContent(message: string, domainId: DomainId): string {
  // Remove the completion signal if present
  const cleanedMessage = message.replace(/\[DOMAIN_COMPLETE:\s*\w+\]/gi, '').trim()

  // Look for markdown code blocks
  const codeBlockPattern = /```markdown\n([\s\S]*?)\n```/
  const codeBlockMatch = cleanedMessage.match(codeBlockPattern)

  if (codeBlockMatch) {
    return codeBlockMatch[1].trim()
  }

  // If no code block, look for markdown headers that match the domain
  // This is a fallback for when the AI doesn't use code blocks
  const headerPattern = new RegExp(`^#\\s+.*${domainId}`, 'im')
  if (headerPattern.test(cleanedMessage)) {
    return cleanedMessage
  }

  // Last resort: return the entire cleaned message
  return cleanedMessage
}
