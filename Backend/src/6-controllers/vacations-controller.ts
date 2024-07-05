import express, { NextFunction, Request, Response, request } from "express"
import vacationsLogic from "../5-logic/vacations-logic"
import VacationModel from "../4-models/VacationModel"
import verifyAdmin from "../3-middleWare/verify-admin"
import FollowersModel from "../4-models/FollowersModel"
import path from "path"
import { UploadedFile } from "express-fileupload"


const router = express.Router()



router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsLogic.getAllVacations()
        response.json(vacations)
    } catch (error: any) {
        next(error)
    }
})
router.get("/vacations/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id
        const vacation = await vacationsLogic.getOneVacation(id)
        response.json(vacation)
    } catch (error: any) {
        next(error)
    }
})

router.get("/images/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = parseInt(request.params.vacationId, 10);

        if (isNaN(vacationId) || vacationId <= 0) {
            return response.status(400).json({ message: "Invalid vacation ID" });
        }
        const imageName = await vacationsLogic.getVacationImageName(vacationId);
        const absolutePath = path.join(__dirname, "..", "1-Assets", "images", imageName);
        console.log(absolutePath +"abs contr++++")
        console.log(imageName+"imageName++++");
        
        response.sendFile(absolutePath);
    } catch (error) {
        next(error);
    }
})


router.post("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    console.log("body request: " + request.body)
    try {
        const vacationData: VacationModel = request.body;
        const vacation = new VacationModel(vacationData);

        if (request.files) {
            const image = request.files.image;
            if (Array.isArray(image)) {
                vacation.image = image[0]; 
            } else {
                vacation.image = image as UploadedFile; 
            }
        }

        const addedVacation = await vacationsLogic.addVacation(vacation);
        response.status(201).json(addedVacation);
    } catch (error: any) {
        next(error);
    }
})

router.put("/vacations/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
     
        request.body.image = request.files?.image
        const vacationId = +request.params.vacationId;
        const vacation = new VacationModel(request.body);
     
       
        const updatedVacation = await vacationsLogic.updatedVocation(vacationId, vacation);
        response.json(updatedVacation);
    } catch (error: any) {
        next(error);
    }
});


router.delete("/vacations/:vacationId",  async(request:Request,response:Response,next:NextFunction)=> {
    try {
        const vacationId = +request.params.vacationId
        await vacationsLogic.deleteVacation(vacationId)
        response.sendStatus(204)
    } catch (error:any) {
        next(error)
    }
})


router.post("/can-follow", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = new FollowersModel(request.body);
        const canFollow = await vacationsLogic.isAllowFollow(follower);
        response.status(200).json(canFollow);
    } catch (error) {
        next(error);
    }
});


router.post('/follower', async (request, response, next) => {
    try {
        const follower = new FollowersModel(request.body);
        const canFollow = await vacationsLogic.isAllowFollow(follower);
        
        if (canFollow) {
            const addedFollower = await vacationsLogic.followe(follower);
            response.status(201).json(addedFollower);
        } else {
            response.status(400).json({ message: "User already follows this vacation" });
        }
    } catch (error) {
        console.error("Failed to add follower:", error);
        next(error);
    }
});

router.get("/follower/:vacationId", async (request: Request, response: Response, next: NextFunction)=>{
    try {
        const vacationId = +request.params.vacationId
        const whoFollow = await vacationsLogic.getFollowersByVacationId(vacationId)
        response.json(whoFollow)
    } catch (error:any) {
        next(error)
    }
})


router.delete("/follower/:userId/:vacationId", async (req, res, next) => {
    try {
        const userId = +req.params.userId;
        const vacationId = +req.params.vacationId;
        await vacationsLogic.unfollow(userId, vacationId);
        res.sendStatus(204);
    } catch (error: any) {
        next(error);
    }
});
router.get("/vacations-in-progress", async (req, res, next) => {
    try {
        const vacations = await vacationsLogic.getVacationsInProgress();
        res.status(200).json(vacations);
    } catch (error:any) {
        next(error);
    }
});

router.get("/vacations-future", async (req, res, next) => {
    try {
        const vacations = await vacationsLogic.getFutureVacations();
        console.log("vacationProgressController"+vacations);
        res.status(200).json(vacations);
    } catch (error:any) {
        next(error);
    }
});

router.get("/vacations/followed/:userId", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const vacations = await vacationsLogic.getFollowedVacations(userId);
        console.log(vacations+ "vacations from controller followed");
        
        res.status(200).json(vacations);
    } catch (error:any) {
        next(error);
    }
});

router.get("/vacations-popularityChart", async (request, response, next) => {
    try {
        const data = await vacationsLogic.getVacationPopularityChart();
        console.log(data); 
        response.json(data);
    } catch (error) {
        next(error);
    }
});

router.get("/followers-count/:vacationId", async (req, res, next) => {
    try {
        const vacationId = +req.params.vacationId;
        const followerCount = await vacationsLogic.getFollowerCountByVacationId(vacationId);
        res.json(followerCount);
    } catch (error) {
        next(error);
    }
});



export default router