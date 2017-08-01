import { serverConfiguration } from '../../startup/server-configuration';

export let botConfig = {
    tradeOfferManager: {
        domain: "example.com",
        language: "en",
        pollInterval: 5000
    },
    community: {
        confirmationCheckingInterval: 30000
    },
    workspace: serverConfiguration.get().botsWorkspace
};