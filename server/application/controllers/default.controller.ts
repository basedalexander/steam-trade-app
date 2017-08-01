import * as express from 'express';

let DefaulController: express.Router = express.Router();
export default DefaulController;

DefaulController.get('/', (req, res, next) => {
    res.render('index');
});