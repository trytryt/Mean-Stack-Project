

import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import "./EditVacation.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import vacationsService from "../../../Services/VacationsService";
import { toast } from 'react-toastify';

export function EditVacation(): JSX.Element {
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>()
    const navigate = useNavigate()
    const params = useParams()

    const [vacation, setVacation] = useState<VacationModel>()

    useEffect(() => {
        const {vacationId} = params
        vacationsService.getOneVacation(+vacationId)
            .then(vacation => {
                
                console.log(vacation);
                setValue("vacationId", vacation.vacationId)
                setValue("description", vacation.description)
                setValue("destination", vacation.destination)
                setValue("imageName", vacation.imageName)
                setValue("startDate", vacation.startDate)
                setValue("endDate", vacation.endDate)
                setValue("price", vacation.price)
                
                
            })
            .catch(err => toast.error(err))
    }, [])

     const send =async (vacation: VacationModel) => {
        try {
            const id = +params.vacationId!;
            vacation.vacationId = id;

         
            const startDate = new Date(vacation.startDate);
            const endDate = new Date(vacation.endDate);
            if (endDate <= startDate) {
                toast.error("End date must be later than the start date");
                return;
            }
            await vacationsService.updateVacation(vacation)
            toast.success("Vacation has been updated successfully")
            navigate("/list")
        } catch (err: any) {
            toast.error(err)
        }
    }

    return (
        <div className="edit-vacation-container">
            <div className="edit-vacation-card">
                <h2>Edit Vacation</h2>
                <form onSubmit={handleSubmit(send)}>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            {...register("description", { required: "Description is required" })}
                            className={formState.errors.description ? "error" : ""}
                        />
                        {formState.errors.description && <span className="error">{formState.errors.description?.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="destination">Destination:</label>
                        <input
                            type="text"
                            id="destination"
                            {...register("destination", { required: "Destination is required" })}
                            className={formState.errors.destination ? "error" : ""}
                        />
                        {formState.errors.destination && <span className="error">{formState.errors.destination?.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            {...register("image")}
                            className={formState.errors.imageName ? "error" : ""}
                        />
                        {formState.errors.imageName && <span className="error">{formState.errors.imageName?.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            {...register("startDate", { required: "Start Date is required" })}
                            className={formState.errors.startDate ? "error" : ""}
                        />
                        {formState.errors.startDate && <span className="error">{formState.errors.startDate?.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            {...register("endDate", { required: "End Date is required" })}
                            className={formState.errors.endDate ? "error" : ""}
                        />
                        {formState.errors.endDate && <span className="error">{formState.errors.endDate?.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            {...register("price", {
                                required: "Price is required",
                                max: { value: 10000, message: "Price cannot exceed 10,000" }
                            })}
                            className={formState.errors.price ? "error" : ""}
                        />
                        {formState.errors.price && <span className="error">{formState.errors.price?.message}</span>}
                    </div>

                    <button type="submit">Edit Vacation</button>
                </form>
            </div>
        </div>
    );
}

export default EditVacation;