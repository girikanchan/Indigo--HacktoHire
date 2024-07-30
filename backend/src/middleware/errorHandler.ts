import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';
import CustomError from '../utils/customError';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.log("Printing Error:");
    console.log(err);

    if (err instanceof MongoError) {
        if (err.code === 11000) {
            return res.status(409).json({
                data: {},
                meta: {
                    devMessage: 'Duplicate key error',
                    timestamp: new Date().getTime(),
                    status: false
                }
            });
        } else {
            return res.status(500).json({
                data: {},
                meta: {
                    devMessage: `MongoError: ${err.message}`,
                    timestamp: new Date().getTime(),
                    status: false
                }
            });
        }
    }

    if (err instanceof CustomError) {
        return res.status(err.code || 500).json({
            data: {},
            meta: {
                devMessage: err.message,
                timestamp: new Date().getTime(),
                status: false
            }
        });
    }

    return res.status(500).json({
        data: {},
        meta: {
            devMessage: 'Internal Server Error',
            timestamp: new Date().getTime(),
            status: false
        }
    });
}
