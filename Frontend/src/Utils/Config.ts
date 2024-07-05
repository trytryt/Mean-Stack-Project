class Config {

    public getAllVacationsUrl = "http://localhost:3002/api/vacations/"

    public imagesUrl = "http://localhost:3002/api/images/"

    public getOneVacationUrl = "http://localhost:3002/api/vacations/:id" 

    public addVacationUrl = "http://localhost:3002/api/vacations/" 

    public updateVacationUrl = "http://localhost:3002/api/vacations" 

    public deleteVacationUrl = "http://localhost:3002/api/vacations/" 

// ----------------------------------//

    public addFollowerUrl = "http://localhost:3002/api/follower/"

    public getFollowerByVacationUrl = "http://localhost:3002/api/follower/"

    public removeFollowerUrl = "http://localhost:3002/api/follower/"

    public canFollow = "http://localhost:3002/api/can-follow/"

    public countFollowers = "http://localhost:3002/api/followers-count/";
    // -------------------------------//

    public vacationsInProgressUrl = "http://localhost:3002/api/vacations-in-progress/"

    public futureVacationsUrl = "http://localhost:3002/api/vacations-future/"

    public followedVacationsUrl = "http://localhost:3002/api/vacations/followed/:userId"
    
    public getVacationPopularityChart = "http://localhost:3002/api/vacations-popularityChart/"
    // --------------------------------
    public registerUrl = "http://localhost:3002/api/auth/register/"

    public loginUrl = "http://localhost:3002/api/auth/login/"

    public logoutUrl = "http://localhost:3002/api/auth/logout/"

    public refreshToken = "http://localhost:3002/api/auth/refresh-token/"

}

const appConfig = new Config() 

export default appConfig