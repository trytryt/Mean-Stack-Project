import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {
    public vacationId: number
    public description: string;
    public destination: string;
    public imageName: string;
    public image: UploadedFile;
    public startDate: string;
    public endDate: string;
    public price: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId
        this.description = vacation.description
        this.destination = vacation.destination
        this.imageName = vacation.imageName
        this.image = vacation.image;
        this.startDate = vacation.startDate
        this.endDate = vacation.endDate
        this.price = vacation.price;
    }

    private static validationSchema = Joi.object({
        vacationId: Joi.number().optional().allow(null),
        description: Joi.string().required().min(4).max(100),
        destination: Joi.string().required().min(2).max(20),
        imageName: Joi.string().optional(),
        image: Joi.any().optional(), // Use Joi.any() to handle file uploads
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        price: Joi.number().required().positive().max(10000)
    });

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default VacationModel;
