import * as uuid from 'node-uuid';

export interface ISession {
    username: string;
}

export class SessionProvider {
    static sessions: Map<string, ISession> = new Map<string, ISession>();

    static get(id: string): ISession {
        return SessionProvider.sessions.get(id);
    }

    static set(session: ISession): string {

        let id: string = SessionProvider.generateId();
        SessionProvider.sessions.set(id, session);

        return id;
    }


    static generateId(): string {
        return uuid.v4();
    }
}