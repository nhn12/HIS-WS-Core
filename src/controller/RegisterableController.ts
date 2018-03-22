import * as express from 'express';

export interface RegistrableController {
    register(app: express.Application, socket?: any): void;
}
