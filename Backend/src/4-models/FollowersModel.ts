class FollowersModel {
    // public followerId:number
    public userId:number
    public vacationId:number

    public constructor(follower:FollowersModel){
        // this.followerId = follower.followerId
        this.userId = follower.userId
        this.vacationId = follower.vacationId
    }
}
export default FollowersModel