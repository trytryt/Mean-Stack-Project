import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/ErrorModel";
import VacationModel from "../4-models/VacationModel";
import { v4 as uuid } from "uuid"
import FollowersModel from "../4-models/FollowersModel";
import { UserModel } from "../4-models/UserModel";
import fs from "fs"

async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT vacationId, description, imageName, destination,
                 DATE_FORMAT(DATE(startDate), '%Y-%m-%d') AS  startDate,
                 DATE_FORMAT(DATE(endDate), '%Y-%m-%d') AS endDate, price 
                 FROM vacations 
                 ORDER BY vacations.startDate ASC`;
    const vacations = await dal.execute(sql)
    return vacations
}

async function getVacationImageName(vacationId: number): Promise<string> {
    if (isNaN(vacationId) || vacationId <=0) {
        throw new Error("Invalid vacation ID");
    }
    const sql = `
    SELECT imageName FROM vacations
    WHERE vacationId = ?
    `;

    const info = await dal.execute(sql, [vacationId])

    if (info.length === 0) throw new ResourceNotFoundErrorModel(vacationId)

    const imageName = info[0].imageName

    return imageName

}

async function getOneVacation(vacationId: number): Promise<VacationModel> {
    console.log(vacationId)
    const sql = `SELECT vacationId, description, imageName, destination,
                    DATE_FORMAT(DATE(startDate), '%Y-%m-%d') AS  startDate, 
                    DATE_FORMAT(DATE(endDate), '%Y-%m-%d') AS endDate, price 
                    FROM vacations  WHERE vacationId = ?`;
    const vacations = await dal.execute(sql, [vacationId]) 

    const vacation = vacations[0]

    if (!vacation) throw new ResourceNotFoundErrorModel(vacationId)

    return vacation
}


async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const error = vacation.validate();
    if (error) throw new ValidationErrorModel(error);

    if (vacation.image) {
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image; 
    }
    console.log("vacation from back")
    console.log(vacation)
    const sql = `
        INSERT INTO vacations (description, destination, imageName, startDate, endDate, price) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    console.log("Vacation before insertion:", vacation);

    const info: OkPacket = await dal.execute(sql, [
        vacation.description,
        vacation.destination,
        vacation.imageName,
        vacation.startDate,
        vacation.endDate,
        vacation.price
    ]);

    console.log("Insert info:", info);
    vacation.vacationId = info.insertId;
    console.log("Inserted vacation with ID:", vacation.vacationId);

    return vacation;
}



async function updatedVocation(vacationId: number, vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validate();
    if (error) {
        throw new ValidationErrorModel(error);
    }
console.log("i am here update before imageName");

    const oldVacation = await getOneVacation(vacationId)

    vacation.imageName = oldVacation.imageName

    if(vacation.image){
        if(fs.existsSync("./src/1-assets/images/"+oldVacation.imageName))
        //delete
        fs.unlinkSync("./src/1-assets/images/"+oldVacation.imageName)
        
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/"+vacation.imageName)
        delete vacation.image;
    }
        const sql = `
            UPDATE vacations SET 
                description = ?, 
                destination = ?, 
                imageName = ?, 
                startDate = ?, 
                endDate = ?, 
                price = ?
            WHERE vacationId = ?
        `;

        const INFO: OkPacket = await dal.execute(sql, [
            vacation.description, 
            vacation.destination, 
            vacation.imageName, 
            vacation.startDate, 
            vacation.endDate, 
            vacation.price, 
            vacationId
        ]);

        if (INFO.affectedRows === 0) {
            throw new ResourceNotFoundErrorModel(`${vacationId}`);
        }

    // vacation.imageName = imageName; 
    return vacation;
}

async function deleteVacation(vacationId: number): Promise<void> {
    try {
      
        const deleteFollowersSql = `DELETE FROM followers WHERE vacationId = ?`;
        await dal.execute(deleteFollowersSql, [vacationId]);

    
        const deleteVacationSql = `DELETE FROM vacations WHERE vacationId = ?`;
        const info: OkPacket = await dal.execute(deleteVacationSql, [vacationId]);
        if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId);
    } catch (error) {
        console.error('Failed to delete vacation:', error);
        throw error;
    }
}



async function isAllowFollow(follower: FollowersModel): Promise<boolean> {
    const { vacationId, userId } = follower
    const sql = `SELECT COUNT(*) as count FROM followers WHERE userId = ? AND vacationId = ?`;
    const result = await dal.execute(sql, [userId, vacationId])
    const count = result[0].count;
    return count === 0;
}

async function followe(follower: FollowersModel): Promise<void> {
    const { vacationId, userId } = follower
    const sql = `
    INSERT INTO followers (vacationId, userId)
    VALUES (?, ?)
`;
    try {
        console.log(" vacation logic Executing SQL:", sql, [vacationId, userId]);
        await dal.execute(sql, [vacationId, userId])
    }
    catch (error) {
        console.error("Failed to add follower:", error);
        throw new Error("Failed to add follower: " + error.message);
    }
}


async function unfollow(userId: number, vacationId: number): Promise<void> {
    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId = ?`;
    const info: OkPacket = await dal.execute(sql, [userId, vacationId]);
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(userId);
}

async function getFollowersByVacationId(vacationId: number): Promise<UserModel[]> {
    const sql = `
    SELECT u.userId, u.userName
    FROM users AS u
    INNER JOIN followers AS f ON u.userId = f.userId
    WHERE f.vacationId = ?

    `;
    const whoFollow = await dal.execute(sql, [vacationId])
    return whoFollow
}

async function getVacationsInProgress() {
    const startDate = new Date().toISOString().split('T')[0]; 
    const endDate = startDate; 
    console.log(startDate+"startDate");
    
    const sql = `
        SELECT * FROM vacations 
        WHERE startDate <= ? AND endDate >= ?
    `;
    try {
        const vacations = await dal.execute(sql, [startDate, endDate]);
        console.log("vacationLogicProgress", vacations);
        return vacations;
    } catch (error) {
        console.error('Failed to get vacations in progress:', error);
        throw error;
    }
}

async function getFutureVacations() {
    const sql = `
        SELECT * FROM vacations 
        WHERE startDate > CURDATE()
    `;
    try {
        const vacations = await dal.execute(sql);
        return vacations;
    } catch (error) {
        console.error('Failed to get future vacations:', error);
        throw error;
    }
}
async function getFollowedVacations(userId) {
    const sql = `
        SELECT v.* FROM vacations v
        JOIN followers f ON v.vacationId = f.vacationId
        WHERE f.userId = ?
    `;
    try {
        const vacations = await dal.execute(sql, [userId]);
        console.log(JSON.stringify(vacations) + " vacations getFollowedVacations logic");
        return vacations;
    } catch (error) {
        console.error('Failed to get followed vacations:', error);
        throw error;
    }
}
async function getVacationPopularityChart() {
    const sql = `
        SELECT 
            vacations.vacationId,
            vacations.destination,
            COUNT(followers.userId) AS followerCount
        FROM vacations
        LEFT JOIN followers ON vacations.vacationId = followers.vacationId
        GROUP BY vacations.vacationId, vacations.destination
    `;
    return await dal.execute(sql);


}
    
async function getFollowerCountByVacationId(vacationId: number): Promise<number> {
    const sql = `SELECT COUNT(*) as followerCount FROM followers WHERE vacationId = ?`;
    const result = await dal.execute(sql, [vacationId]);
    const followerCount = result[0].followerCount;
    return followerCount;
}

export default {
    getAllVacations,
    getVacationImageName,
    getOneVacation,
    addVacation,
    updatedVocation,
    deleteVacation,
    followe,
    unfollow,
    getFollowersByVacationId, 
    isAllowFollow,
    getVacationsInProgress,
    getFutureVacations,
    getFollowedVacations,
    getVacationPopularityChart,
    getFollowerCountByVacationId
   
    
    
}


