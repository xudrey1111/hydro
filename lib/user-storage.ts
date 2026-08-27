// Shared user storage across API routes
// In production, replace with a real database
class UserStorage {
  private users: Map<string, string>

  constructor() {
    this.users = new Map<string, string>()
    this.users.set("admin", "admin123")
  }

  register(username: string, password: string): boolean {
    if (this.users.has(username)) {
      return false
    }
    this.users.set(username, password)
    console.log("[v0] User registered:", username)
    console.log("[v0] Total users:", this.users.size)
    return true
  }

  login(username: string, password: string): boolean {
    const storedPassword = this.users.get(username)
    console.log("[v0] Login attempt:", username)
    console.log("[v0] User exists:", this.users.has(username))
    return storedPassword !== undefined && storedPassword === password
  }

  getAllUsers(): string[] {
    return Array.from(this.users.keys())
  }
}

// Singleton instance
export const userStorage = new UserStorage()
