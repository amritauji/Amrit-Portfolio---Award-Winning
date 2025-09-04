// User preferences and memory management
export const UserPreferences = {
  // Check if user has visited before
  hasVisited: () => {
    return localStorage.getItem('spacePortfolioVisited') === 'true'
  },

  // Mark user as visited
  setVisited: () => {
    localStorage.setItem('spacePortfolioVisited', 'true')
    localStorage.setItem('lastVisit', new Date().toISOString())
  },

  // Get last scene user was on
  getLastScene: () => {
    return localStorage.getItem('lastScene') || 'intro'
  },

  // Save current scene
  saveScene: (scene) => {
    localStorage.setItem('lastScene', scene)
  },

  // Get visit count
  getVisitCount: () => {
    const count = localStorage.getItem('visitCount') || '0'
    return parseInt(count)
  },

  // Increment visit count
  incrementVisitCount: () => {
    const count = UserPreferences.getVisitCount() + 1
    localStorage.setItem('visitCount', count.toString())
    return count
  },

  // Check if user prefers to skip intro
  shouldSkipIntro: () => {
    return UserPreferences.getVisitCount() > 2
  },

  // Clear all preferences (for testing)
  clear: () => {
    localStorage.removeItem('spacePortfolioVisited')
    localStorage.removeItem('lastVisit')
    localStorage.removeItem('lastScene')
    localStorage.removeItem('visitCount')
  }
}