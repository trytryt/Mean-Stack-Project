import axios from "axios";
import FollowersModel from "../Models/FollowersModel";
import appConfig from "../Utils/Config";

class FollowersService {
    public async addFollower(follower: FollowersModel): Promise<FollowersModel> {
        try {
            console.log('follow from react followerService', follower);
            const response = await axios.post(appConfig.addFollowerUrl, follower);
            const addedFollower = response.data;
            return addedFollower;
        } catch (error) {
            console.error('Failed to add follower: followerService', error);
            throw new Error('Failed to add follower: followerService');
        }
    }

    public async removeFollower(userId: number, vacationId: number): Promise<void> {
        await axios.delete(`${appConfig.removeFollowerUrl}${userId}/${vacationId}`);
    }

    public async getFollowersByVacationId(userId: number): Promise<FollowersModel[]> {
        const response = await axios.get<FollowersModel[]>(appConfig.getFollowerByVacationUrl + userId);
        return response.data;
    }

    public async getFollowerCount(vacationId: number): Promise<number> {
        try {
            const response = await axios.get<number>(`${appConfig.countFollowers}${vacationId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch follower count:', error);
            throw new Error('Failed to fetch follower count: ' + error);
        }
    }

    public async canFollow(follower: FollowersModel): Promise<boolean> {
        try {
            const response = await axios.post<boolean>(appConfig.canFollow, follower);
            return response.data;
        } catch (error) {
            console.error('Failed to check if user can follow: followerService', error);
            throw new Error('Failed to check if user can follow: followerService');
        }
    }
}

const followersService = new FollowersService();
export default followersService;
