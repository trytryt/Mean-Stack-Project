import axios from "axios";
import appConfig from "../Utils/Config";
import VacationModel from "../Models/VacationModel";
import FollowersModel from "../Models/FollowersModel";
import { vacationsAction, vacationsActionType, vacationsStore } from "../Redux/VacationsState";


class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations
        // if (!vacations) {

        const response = await axios.get<VacationModel[]>(appConfig.getAllVacationsUrl)
        vacations = response.data
        console.log(vacations)
        vacationsStore.dispatch({ type: vacationsActionType.FetchVacations, payload: vacations })
        // }
        return vacations
    }


    public async getImage(vocationId: number): Promise<any> {
        const response = await axios.get(appConfig.imagesUrl + vocationId)
        const image = response.data
        return image
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        console.log(vacationId)
        let vacations = vacationsStore.getState().vacations

        let vacation = vacations.find(v => v.vacationId === vacationId)
        // if (!vacation) {
        //     const response = await axios.get<VacationModel>(appConfig.getOneVacationUrl + vacationId)

        //     vacation = response.data
        // }
        console.log(vacation);
        

        return vacation
    }


    public async addVacation(formData: FormData): Promise<void> {
        await axios.post<VacationModel>(appConfig.addVacationUrl, formData);
    }


    public async updateVacation(vacation: VacationModel): Promise<void> {
        const formData = new FormData();
        formData.append("description", vacation.description);
        formData.append("destination", vacation.destination);
        formData.append("startDate", vacation.startDate.toString());
        formData.append("endDate", vacation.endDate.toString());
        formData.append("price", vacation.price.toString());
        formData.append("image", vacation.image[0]);


        console.log(formData);
        
        try {
            const response = await axios.put<VacationModel>(`${appConfig.updateVacationUrl}/${vacation.vacationId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response + "response service up");

            const updatedVacation = response.data;
            vacationsStore.dispatch({ type: vacationsActionType.UpdateVacation, payload: updatedVacation });
        } catch (error) {
          
            console.error('Error updating vacation:', error);
            throw error; 
        }
    }
    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.deleteVacationUrl + vacationId)
        vacationsStore.dispatch({ type: vacationsActionType.DeleteVacation, payload: vacationId })

    }


    public async getVacationsInProgress(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.vacationsInProgressUrl);
        return response.data;
    }

    public async getFutureVacations(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.futureVacationsUrl);
        return response.data;
    }


    public async getFollowedVacations(userId: number): Promise<VacationModel[]> {
        const url = appConfig.followedVacationsUrl.replace(":userId", userId.toString());
        console.log(url + "url");
        const response = await axios.get<VacationModel[]>(url);
        console.log(JSON.stringify(response.data) + " response from service"); 
        return response.data;
    }

    public async getPopularityVactions() {
        const response = await axios.get(appConfig.getVacationPopularityChart)
        console.log(response.data + "response popul");
        return response.data
    }

}



const vacationsService = new VacationsService()

export default vacationsService