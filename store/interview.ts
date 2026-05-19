import { create } from 'zustand'
import type { DomainId } from '@/lib/interview/domains'

/**
 * Interview State Machine
 *
 * Manages the state of an AI planning interview session:
 * - Current domain and completion status
 * - Conversation history
 * - Generated documentation content per domain
 * - Streaming state
 */

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface InterviewState {
  // Session metadata
  projectId: string | null
  systemPrompt: string | null

  // Interview progress
  status: 'idle' | 'interviewing' | 'complete'
  currentDomain: DomainId | null
  completedDomains: DomainId[]

  // Content
  domainContent: Record<DomainId, string>
  conversationHistory: Message[]

  // UI state
  isStreaming: boolean
  streamingContent: string
  setStreamingContent: (content: string) => void

  // Actions
  initializeSession: (projectId: string, systemPrompt: string) => void
  addUserMessage: (content: string) => void
  addAssistantMessage: (content: string) => void
  startStreaming: () => void
  stopStreaming: () => void
  completeDomain: (domainId: DomainId, content: string) => void
  resumeFromSaved: (savedState: Partial<InterviewState>) => void
  reset: () => void
  toJSON: () => InterviewStateJSON
}

export interface InterviewStateJSON {
  status: string
  currentDomain: DomainId | null
  completedDomains: DomainId[]
  domainContent: Record<DomainId, string>
  conversationHistory: Array<{ role: string; content: string }>
}

const initialState = {
  projectId: null,
  systemPrompt: null,
  status: 'idle' as const,
  currentDomain: null,
  completedDomains: [],
  domainContent: {} as Record<DomainId, string>,
  conversationHistory: [],
  isStreaming: false,
  streamingContent: '',
}

export const useInterviewStore = create<InterviewState>((set, get) => ({
  ...initialState,

  initializeSession: (projectId: string, systemPrompt: string) => {
    set({
      projectId,
      systemPrompt,
      status: 'interviewing',
      currentDomain: 'planning',
      completedDomains: [],
      domainContent: {} as Record<DomainId, string>,
      conversationHistory: [],
      isStreaming: false,
      streamingContent: '',
    })
  },

  addUserMessage: (content: string) => {
    const message: Message = {
      role: 'user',
      content,
      timestamp: Date.now(),
    }

    set((state) => ({
      conversationHistory: [...state.conversationHistory, message],
    }))
  },

  addAssistantMessage: (content: string) => {
    const message: Message = {
      role: 'assistant',
      content,
      timestamp: Date.now(),
    }

    set((state) => ({
      conversationHistory: [...state.conversationHistory, message],
      streamingContent: '',
    }))
  },

  startStreaming: () => {
    set({
      isStreaming: true,
      streamingContent: '',
    })
  },

  stopStreaming: () => {
    set({
      isStreaming: false,
    })
  },

  setStreamingContent: (content: string) => {
    set({ streamingContent: content })
  },

  completeDomain: (domainId: DomainId, content: string) => {
    const state = get()

    const completedDomains = state.completedDomains.includes(domainId)
      ? state.completedDomains
      : [...state.completedDomains, domainId]

    const domainContent = {
      ...state.domainContent,
      [domainId]: content,
    }

    const allDomains: DomainId[] = [
      'planning',
      'architecture',
      'database',
      'api',
      'environment',
      'auth',
      'testing',
      'monitoring',
      'frontend',
      'deployment',
    ]

    const currentIndex = allDomains.indexOf(domainId)
    const nextDomain = currentIndex < allDomains.length - 1 ? allDomains[currentIndex + 1] : null

    const isComplete = completedDomains.length === allDomains.length

    set({
      completedDomains,
      domainContent,
      currentDomain: nextDomain,
      status: isComplete ? 'complete' : 'interviewing',
    })
  },

  resumeFromSaved: (savedState: Partial<InterviewState>) => {
    set({
      status: savedState.status || 'interviewing',
      currentDomain: savedState.currentDomain || 'planning',
      completedDomains: savedState.completedDomains || [],
      domainContent: savedState.domainContent || ({} as Record<DomainId, string>),
      conversationHistory: savedState.conversationHistory || [],
      isStreaming: false,
      streamingContent: '',
    })
  },

  reset: () => {
    set(initialState)
  },

  toJSON: () => {
    const state = get()
    return {
      status: state.status,
      currentDomain: state.currentDomain,
      completedDomains: state.completedDomains,
      domainContent: state.domainContent,
      conversationHistory: state.conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    }
  },
}))
