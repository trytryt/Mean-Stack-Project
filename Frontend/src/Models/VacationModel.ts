// class VacationModel{

import { toast } from "react-toastify";

//     public vacationId: number 
//     public description: string
//     public destination: string
//     public imageName: any
//     public image: FileList
//     public startDate: string
//     public endDate: string
//      public price: number

     
// }
// export default VacationModel

class VacationModel {
    public vacationId: number;
    public description: string;
    public destination: string;
    public imageName: string; 
    public image: FileList 
    public startDate: string;
    public endDate: string;
    public price: number;

 
    public validate(): string | null {
        if (!this.description || !this.destination || !this.startDate || !this.endDate || !this.price) {
            toast.error ("All fields are required")
        }
        if (new Date(this.endDate) <= new Date(this.startDate)) {
            toast.error ("End date must be later than the start date")  
        }
        return null;
    }
}

export default VacationModel;
