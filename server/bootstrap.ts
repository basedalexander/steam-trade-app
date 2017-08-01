import { serverConfiguration } from './startup/server-configuration'
import { Server } from './startup/server';
import { csgoPrices } from './application/models/steam-items-prices';

let server: Server = new Server(serverConfiguration.get());

csgoPrices.load()
    .then(() => {
        server.listen()
            .then(() => {
                console.log(`app is listening on port ${serverConfiguration.get().port}`);
            });
    })
    .catch(err => {
        throw new Error(err.message);
    });
