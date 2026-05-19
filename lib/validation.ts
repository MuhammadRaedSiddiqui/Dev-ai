/**
 * Input validation and sanitization utilities
 * Provides comprehensive validation for all user inputs
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Sanitize string input to prevent XSS attacks
 * Removes HTML tags and dangerous characters
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''

  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '')

  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Trim whitespace
  sanitized = sanitized.trim()

  // Limit length to prevent DoS
  return sanitized.slice(0, 1000)
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  const sanitized = sanitizeInput(email)

  if (!sanitized) {
    return { isValid: false, error: 'Email is required' }
  }

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  if (!emailRegex.test(sanitized)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }

  if (sanitized.length > 254) {
    return { isValid: false, error: 'Email address is too long' }
  }

  return { isValid: true }
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Password is required' }
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' }
  }

  if (password.length > 128) {
    return { isValid: false, error: 'Password is too long (max 128 characters)' }
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' }
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' }
  }

  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' }
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' }
  }

  return { isValid: true }
}

/**
 * Validate password confirmation
 */
export function validatePasswordMatch(password: string, confirmPassword: string): ValidationResult {
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' }
  }

  return { isValid: true }
}

/**
 * Validate Anthropic API key format
 */
export function validateApiKey(apiKey: string): ValidationResult {
  const sanitized = sanitizeInput(apiKey)

  if (!sanitized) {
    return { isValid: false, error: 'API key is required' }
  }

  // Anthropic API keys start with sk-ant-
  if (!sanitized.startsWith('sk-ant-')) {
    return { isValid: false, error: 'Invalid API key format. Must start with sk-ant-' }
  }

  // Check minimum length (Anthropic keys are typically longer)
  if (sanitized.length < 40) {
    return { isValid: false, error: 'API key is too short' }
  }

  // Check maximum length to prevent abuse
  if (sanitized.length > 200) {
    return { isValid: false, error: 'API key is too long' }
  }

  // Only allow alphanumeric and hyphens
  if (!/^[a-zA-Z0-9-]+$/.test(sanitized)) {
    return { isValid: false, error: 'API key contains invalid characters' }
  }

  return { isValid: true }
}

/**
 * Validate project name
 */
export function validateProjectName(name: string): ValidationResult {
  const sanitized = sanitizeInput(name)

  if (!sanitized) {
    return { isValid: false, error: 'Project name is required' }
  }

  if (sanitized.length < 3) {
    return { isValid: false, error: 'Project name must be at least 3 characters' }
  }

  if (sanitized.length > 100) {
    return { isValid: false, error: 'Project name is too long (max 100 characters)' }
  }

  return { isValid: true }
}

/**
 * Validate general text input
 */
export function validateTextInput(text: string, minLength: number = 1, maxLength: number = 1000): ValidationResult {
  const sanitized = sanitizeInput(text)

  if (!sanitized) {
    return { isValid: false, error: 'This field is required' }
  }

  if (sanitized.length < minLength) {
    return { isValid: false, error: `Must be at least ${minLength} characters` }
  }

  if (sanitized.length > maxLength) {
    return { isValid: false, error: `Must be no more than ${maxLength} characters` }
  }

  return { isValid: true }
}

/**
 * Sanitize and validate URL
 */
export function validateUrl(url: string): ValidationResult {
  const sanitized = sanitizeInput(url)

  if (!sanitized) {
    return { isValid: false, error: 'URL is required' }
  }

  try {
    const urlObj = new URL(sanitized)

    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'URL must use http or https protocol' }
    }

    return { isValid: true }
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' }
  }
}

/**
 * Rate limiting helper for client-side
 * Prevents rapid form submissions
 */
export class RateLimiter {
  private lastSubmit: number = 0
  private minInterval: number

  constructor(minIntervalMs: number = 1000) {
    this.minInterval = minIntervalMs
  }

  canSubmit(): boolean {
    const now = Date.now()
    if (now - this.lastSubmit < this.minInterval) {
      return false
    }
    this.lastSubmit = now
    return true
  }

  getRemainingTime(): number {
    const now = Date.now()
    const remaining = this.minInterval - (now - this.lastSubmit)
    return Math.max(0, remaining)
  }
}
