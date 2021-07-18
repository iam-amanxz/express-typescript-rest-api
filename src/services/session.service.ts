export class SessionService {
  sessions: Record<
    string,
    { sessionId: string; userId: string; username: string; valid: boolean }
  > = {};

  getSession(sessionId: string) {
    const session = this.sessions[sessionId];
    return session && session.valid ? session : null;
  }

  invalidateSession(sessionId: string) {
    const session = this.sessions[sessionId];
    if (session) {
      this.sessions[sessionId].valid = false;
    }
    return this.sessions[sessionId];
  }

  createSession(userId: string, username: string) {
    const sessionId = String(Object.keys(this.sessions).length + 1);
    const session = { sessionId, userId, username, valid: true };
    this.sessions[sessionId] = session;
    return session;
  }
}

export default new SessionService();
