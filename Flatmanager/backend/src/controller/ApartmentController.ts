import { getRepository } from "typeorm";
import {Apartment} from "../entity/Apartment";
import {Controller} from "./controller";


export class ApartmentController extends Controller {
    repo = getRepository(Apartment);

}
