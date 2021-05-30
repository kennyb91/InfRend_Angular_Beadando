import { Router } from 'express';
import { TenantController } from './controller/TenantController';
import { ApartmentController } from './controller/ApartmentController';
import { FeeController } from './controller/FeeController';
import { PaymentController } from './controller/PaymentController';

export function getRouter(): Router {
    const router = Router();

    const tenantController = new TenantController();
    const apartmentController = new ApartmentController();
    const feeController = new FeeController();
    const paymentController = new PaymentController();

    //Lakok
    router.get('/tenants', tenantController.getAll);
    router.get('/tenants_active', tenantController.getAllActive);
    router.get('/tenants/:id', tenantController.getOne);
    router.post('/tenants', tenantController.create);
    router.put('/tenants_move', tenantController.moveOut);
    router.put('/tenants', tenantController.update);
    router.delete('/tenants/:id', tenantController.delete);

    //Lakasok
    router.get('/apartments', apartmentController.getAll);
    router.get('/apartments/:id', apartmentController.getOne);

    //Koltsegek
    router.get('/fees', feeController.getAllFees);
    router.post('/fees', feeController.create);

    //Befizetesek
    router.get('/payments', paymentController.getAllPayments);
    router.post('/payments', paymentController.create);

    return router;
}
