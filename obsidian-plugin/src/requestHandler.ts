import {
    App,
    PluginManifest
} from "obsidian";

import express from 'express';
import { OmnisearchHttpSettings } from "./types";
import cors from "cors";

/* eslint-disable */
declare global {
    interface Window {
        omnisearch: {
            search: (query: string) => Promise<any>;
        }
    }
}
/* eslint-enable */

export default class RequestHandler {
    app: App;
    api: express.Express;
    manifest: PluginManifest;
    settings: OmnisearchHttpSettings;

    constructor(
        app: App,
        manifest: PluginManifest,
        settings: OmnisearchHttpSettings
    ) {
        this.app = app;
        this.manifest = manifest;
        this.settings = settings;
        this.api = express();
    }

    isRequestAuthorized(req: express.Request): boolean {
        const authorizationHeader = req.get("Authorization");
        if (authorizationHeader === `Bearer ${this.settings.apiKey}`) {
            return true;
        }
        return false;
    }

    async searchGetHandler(req: express.Request, res: express.Response): Promise<void> {
        const query: string = req.query.q as string;
        const results = await window.omnisearch.search(query);

        res.json(results);
    }

    async authenticationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        if (!this.isRequestAuthorized(req)) {
            res.status(401).send("Unauthorized");
            return;
        }

        next();
    }

    setupRouter() {
        this.api.use(cors());
        this.api.use(this.authenticationMiddleware.bind(this));
        this.api.use(express.json());

        this.api.route("/omnisearch/").get(this.searchGetHandler.bind(this));
    }
}