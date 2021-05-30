import { getRepository } from "typeorm";
import { Payment } from "../entity/Payment";
import { Controller } from "./controller";


export class PaymentController extends Controller {
    repo = getRepository(Payment);

// All payments from selected tenant in the selected time. 
    getAllPayments = async (req, res) => {
        const id = req.query.id;
        const dateStart = req.query.dateStart;
        const dateEnd = req.query.dateEnd;
        try {
            const entities = await this.repo.createQueryBuilder("Payment")
                .innerJoinAndSelect('Payment.tenant', 'Tenant')
                .where("DATE(Payment.date) > :dateStart", { dateStart: dateStart })
                .andWhere("DATE(Payment.date) <= :dateEnd", { dateEnd: dateEnd })
                .andWhere("Payment.tenant = :id", { id: id })
                .orderBy("Payment.date")
                .getMany()
            res.json(entities);
        } catch (error) {
            console.error();
            this.handleError(res);
        }

    }

    
}
