import * as morgan from 'morgan';
import { RequestHandler } from 'express';

export var logger: RequestHandler = morgan('tiny');