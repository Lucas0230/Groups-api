import { Fluxo } from '../models/Fluxo';

export default (req, res, next) => {
    const test = () => {
        setTimeout(() => {
            if (!Fluxo) {
                console.log('restest start models');
                return test();
            }
            console.log('success');
            next();
        }, 1000);
    };

    if (!Fluxo) {
        return test();
    }

    next();
};
