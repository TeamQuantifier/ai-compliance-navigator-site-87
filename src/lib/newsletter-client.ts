/**
 * Simple Newsletter API Client - JavaScript
 * Just subscribe and unsubscribe functionality
 */
export class NewsletterClient {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl.replace(/\/$/, '');
  }

  private async _request(endpoint: string, method = 'GET', data: any = null) {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : null
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  /**
   * Subscribe to newsletter
   * @param email - User's email
   * @param language - Language preference (e.g. 'en', 'es', 'fr')
   * @param options - Optional data (first_name, last_name, source, etc.)
   */
  async subscribe(email: string, language: string, options: Record<string, any> = {}) {
    return this._request('/subscribe', 'POST', {
      email,
      language,
      ...options
    });
  }

  /**
   * Unsubscribe from newsletter
   * @param emailOrToken - Email address or subscription token
   */
  async unsubscribe(emailOrToken: string) {
    // If it looks like an email, unsubscribe by email (returns JSON)
    if (emailOrToken.includes('@')) {
      return this._request('/unsubscribe', 'POST', { email: emailOrToken });
    } else {
      // Otherwise treat as subscription token (returns HTML)
      const response = await fetch(`${this.apiUrl}/unsubscribe?token=${encodeURIComponent(emailOrToken)}`);
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || `HTTP ${response.status}`);
      }
      
      return response.text();
    }
  }
}

// Initialize the newsletter client
export const newsletterClient = new NewsletterClient('https://marketing.quantifier.ai');
