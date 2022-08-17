import { execaCommandSync } from 'execa'

/**
 * Check if the git repo is valid
 */
export const checkGitRepo = (cwd: string): boolean => {
  try {
    execaCommandSync('git log', { cwd })
    return true
  } catch {
    return false
  }
}
