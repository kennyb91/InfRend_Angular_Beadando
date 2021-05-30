import { getRepository, Repository } from "typeorm";
import {Tenant} from "../entity/Tenant";
import {Controller} from "./controller";


export class TenantController extends Controller {
    repo = getRepository(Tenant);

    getAllActive = async (req, res) => {
        try {
            const allEntities = await this.repo.createQueryBuilder('Tenant').leftJoinAndSelect('Tenant.apartment','Apartment').where('Tenant.apartment IS NOT NULL').getMany();
            res.json(allEntities);
        } catch (error) {
            console.error();
            this.handleError(res);
        };
    }

    moveOut = async (req, res) => {
        const id = req.body.id;
        try {
            await this.repo.createQueryBuilder()
            .update(Tenant)
            .set({ apartment: null })
            .where("id = :id", { id: id })
            .execute();

           // res.json(entity);
        } catch(error) {
            console.error();
            this.handleError(res);
        }
    }


}
