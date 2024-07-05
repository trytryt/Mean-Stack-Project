
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import { toast } from "react-toastify";
import "./AddVacation.css";

export function AddVacation(): JSX.Element {
  useVerifyLoggedIn();

  const { register, handleSubmit, formState } = useForm<VacationModel>();
  const navigate = useNavigate();

  async function send(data: VacationModel) {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("destination", data.destination);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("price", data.price.toString());

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await vacationsService.addVacation(formData);
      toast("New vacation has been successfully added!");
      navigate("/list");
    } catch (err: any) {
      toast.error("Please check all the fields are correct.");
    }
  }

  return (
    <div className="add-vacation-container">
      <div className="add-vacation-card">
        <h2>Add Vacation</h2>
        <form onSubmit={handleSubmit(send)}>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              {...register("description", { required: "Description is required" })}
            />
            {formState.errors.description && (
              <span className="error">{formState.errors.description?.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              {...register("destination", { required: "Destination is required" })}
            />
            {formState.errors.destination && (
              <span className="error">{formState.errors.destination?.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" accept="image/*" {...register("image")} />
            {formState.errors.image && (
              <span className="error">{formState.errors.image?.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              {...register("startDate", { required: "Start Date is required" })}
            />
            {formState.errors.startDate && (
              <span className="error">{formState.errors.startDate?.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              {...register("endDate", { required: "End Date is required" })}
            />
            {formState.errors.endDate && (
              <span className="error">{formState.errors.endDate?.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              {...register("price", {
                required: "Price is required",
                max: { value: 10000, message: "Price cannot exceed 10,000" },
              })}
            />
            {formState.errors.price && (
              <span className="error">{formState.errors.price?.message}</span>
            )}
          </div>

          <button type="submit">Add Vacation</button>
        </form>
      </div>
    </div>
  );
}

export default AddVacation;