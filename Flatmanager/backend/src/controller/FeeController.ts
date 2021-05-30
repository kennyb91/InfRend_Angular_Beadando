import { getRepository } from "typeorm";
import { Fee } from "../entity/Fee";
import { Controller } from "./controller";


export class FeeController extends Controller {
    repo = getRepository(Fee);

// All fees from selected tenant in the selected time. 
    getAllFees = async (req, res) => {
        const id = req.query.id;
        const dateStart = req.query.dateStart;
        const dateEnd = req.query.dateEnd;
        try {
            const entities = await this.repo.createQueryBuilder("Fee")
                .innerJoinAndSelect('Fee.tenant', 'Tenant')
                .where("DATE(Fee.date) > :dateStart", {dateStart: dateStart})
                .andWhere("DATE(Fee.date) <= :dateEnd", {dateEnd: dateEnd})
                .andWhere("Fee.tenant = :id", { id: id })
                .orderBy("Fee.date")
                .getMany()
            res.json(entities);
        } catch (error) {
            console.error();
            this.handleError(res);
        }

    }
}
