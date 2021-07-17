export const sessions: Record<
  string,
  { sessionId: string; userId: string; username: string; valid: boolean }
> = {};

export function getSession(sessionId: string) {
  const session = sessions[sessionId];
  return session && session.valid ? session : null;
}

export function invalidateSession(sessionId: string) {
  const session = sessions[sessionId];
  if (session) {
    sessions[sessionId].valid = false;
  }
  return sessions[sessionId];
}

export function createSession(userId: string, username: string) {
  const sessionId = String(Object.keys(sessions).length + 1);
  const session = { sessionId, userId, username, valid: true };
  sessions[sessionId] = session;
  return session;
}
