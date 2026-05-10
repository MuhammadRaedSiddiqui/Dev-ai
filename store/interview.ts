import { create } from 'zustand'
import type { DomainId } from '@/lib/interview/domains'

/**
 * Interview State Machine
 *
 * Manages the state of an AI interview session using Zustand.
 * Tracks current domain, completed domains, generated content, and conversation history.
 */

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface InterviewState {
  // Session state
  projectId: string | null
  status: 'idle' | 'interviewing' | 'complete'

  // Domain tracking
  currentDomain: DomainId | null
  completedDomains: DomainId[]

  // Generated content (keyed by domain ID)
  domainContent: Record<string, string>

  // Conversation history
  conversationHistory: Message[]

  // Loading states
  isStreaming: boolean
  isSaving: boolean

  // Actions
  initializeSession: (projectId: string, systemPrompt: string) => void
  addUserMessage: (content: string) => void
  addAssistantMessage: (content: string) => void
  startStreaming: () => void
  stopStreaming: () => void
  completeDomain: (domainId: DomainId, content: string) => void
  resumeFromSaved: (savedData: InterviewData) => void
  reset: () => void

  // Serialization
  toJSON: () => InterviewData
}

export interface InterviewData {
  status: 'idle' | 'interviewing' | 'complete'
  currentDomain: DomainId | null
  completedDomains: DomainId[]
  domainContent: Record<string, string>
  conversationHistory: Message[]
}

export const useInterviewStore = create<InterviewState>((set, get) => ({
  // Initial state
  projectId: null,
  status: 'idle',
  currentDomain: null,
  completedDomains: [],
  domainContent: {},
  conversationHistory: [],
  isStreaming: false,
  isSaving: false,

  // Initialize a new interview session
  initializeSession: (projectId: string, systemPrompt: string) => {
    set({
      projectId,
      status: 'interviewing',
      currentDomain: 'planning', // Start with first domain
      completedDomains: [],
      domainContent: {},
      conversationHistory: [],
    })
  },

  // Add user message to conversation
  addUserMessage: (content: string) => {
    set((state) => ({
      conversationHistory: [
        ...state.conversationHistory,
        {
          role: 'user',
          content,
          timestamp: Date.now(),
        },
      ],
    }))
  },

  // Add assistant message to conversation
  addAssistantMessage: (content: string) => {
    set((state) => ({
      conversationHistory: [
        ...state.conversationHistory,
        {
          role: 'assistant',
          content,
          timestamp: Date.now(),
        },
      ],
    }))
  },

  // Start streaming indicator
  startStreaming: () => {
    set({ isStreaming: true })
  },

  // Stop streaming indicator
  stopStreaming: () => {
    set({ isStreaming: false })
  },

  // Mark a domain as complete and store its content
  completeDomain: (domainId: DomainId, content: string) => {
    const { completedDomains, currentDomain } = get()

    // Add to completed domains if not already there
    const newCompletedDomains = completedDomains.includes(domainId)
      ? completedDomains
      : [...completedDomains, domainId]

    // Store the generated content
    const newDomainContent = {
      ...get().domainContent,
      [domainId]: content,
    }

    // Determine next domain
    const domainOrder: DomainId[] = [
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

    const currentIndex = domainOrder.indexOf(domainId)
    const nextDomain = currentIndex < domainOrder.length - 1 ? domainOrder[currentIndex + 1] : null

    // Check if all domains are complete
    const allComplete = newCompletedDomains.length === domainOrder.length

    set({
      completedDomains: newCompletedDomains,
      domainContent: newDomainContent,
      currentDomain: nextDomain,
      status: allComplete ? 'complete' : 'interviewing',
    })
  },

  // Resume from saved interview data
  resumeFromSaved: (savedData: InterviewData) => {
    set({
      status: savedData.status,
      currentDomain: savedData.currentDomain,
      completedDomains: savedData.completedDomains,
      domainContent: savedData.domainContent,
      conversationHistory: savedData.conversationHistory,
    })
  },

  // Reset to initial state
  reset: () => {
    set({
      projectId: null,
      status: 'idle',
      currentDomain: null,
      completedDomains: [],
      domainContent: {},
      conversationHistory: [],
      isStreaming: false,
      isSaving: false,
    })
  },

  // Serialize state to JSON for saving to Supabase
  toJSON: () => {
    const state = get()
    return {
      status: state.status,
      currentDomain: state.currentDomain,
      completedDomains: state.completedDomains,
      domainContent: state.domainContent,
      conversationHistory: state.conversationHistory,
    }
  },
}))
