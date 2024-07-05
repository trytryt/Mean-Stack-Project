
import React, { useEffect, useState } from 'react';
import {
    IconButton,
    Typography,
    Tooltip,
    Dialog,
 DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    IconButtonProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserModel from '../../../Models/UserModel';
import VacationModel from '../../../Models/VacationModel';
import vacationsService from '../../../Services/VacationsService';
import followersService from '../../../Services/FollowersService';
import appConfig from '../../../Utils/Config';
import './VacationCard.css';
import { toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';

interface VacationCardProps {
    vacation: VacationModel;
    user: UserModel;
    getData: Function;
}

interface StyledIconButtonProps {
    followed: boolean;
}

const StyledIconButton = styled(({ followed, ...rest }: StyledIconButtonProps & IconButtonProps) => (
    <IconButton {...rest} />
))<StyledIconButtonProps>(({ theme, followed }) => ({
    '&:hover': {
        color: followed ? theme.palette.error.main : theme.palette.primary.main,
    },
    color: followed ? theme.palette.error.main : theme.palette.primary.main,
}));

const VacationCard: React.FC<VacationCardProps> = ({ vacation, user, getData }) => {
    const [followed, setFollowed] = useState<boolean>(false);
    const [followersCount, setFollowersCount] = useState<number>(0);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const followers = await followersService.getFollowersByVacationId(vacation.vacationId);
                const isFollowed = followers.some((f) => f.userId === user.userId);
                setFollowed(isFollowed);
                setFollowersCount(followers.length);
            } catch (error) {
                console.error('Failed to fetch followers:', error);
            }
        };

        fetchData();
    }, [vacation.vacationId, user]);

    const handleFollowToggle = async () => {
        try {
            if (!user) {
                toast.error('User data is not available');
                return;
            }
            if (followed) {
                await followersService.removeFollower(user.userId, vacation.vacationId);
                toast.success('Successfully unfollowed the vacation!');
                setFollowed(false);
                setFollowersCount((prevCount) => prevCount - 1);
            } else {
                const follower = { vacationId: vacation.vacationId, userId: user.userId };
                await followersService.addFollower(follower);
                toast.success('Successfully followed the vacation!');
                setFollowed(true);
                setFollowersCount((prevCount) => prevCount + 1);
            }
        } catch (error: any) {
            toast.error('Failed to follow/unfollow the vacation: ' + error.message);
        }
    };

    const handleDelete = async (vacationId: number) => {
        setConfirmDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await vacationsService.deleteVacation(vacation.vacationId);
            getData();
            toast.success('Vacation deleted successfully!');
        } catch (error: any) {
            toast.error('Failed to delete the vacation: ' + error.message);
        } finally {
            setConfirmDialogOpen(false);
        }
    };

    const handleCancelDelete = () => {
        setConfirmDialogOpen(false);
    };

    const handleEdit = () => {
        try {
            navigate(`/edit-vacation/${vacation.vacationId}`);
        } catch (error: any) {
            toast.info('Edit functionality not implemented yet');
        }
    };

    return (
        <Card className="VacationCard" sx={{ maxWidth: 345, margin: 2, boxShadow: 3, overflowY: 'auto', maxHeight: '30vh', padding: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={appConfig.imagesUrl + vacation.vacationId}
                alt={vacation.destination}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {vacation.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {vacation.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Start Date: {vacation.startDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    End Date: {vacation.endDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: {vacation.price}
                </Typography>
                {followersCount > 0 && user.role === 'User' && (
                    <Typography variant="body1" gutterBottom>
                        <strong>{followersCount}</strong>
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                {user?.role === 'Admin' ? (
                    <>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(vacation.vacationId)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Link to={`/edit-vacation/`+vacation.vacationId}>
                            <Tooltip title="Edit">
                                <IconButton >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </>
                ) : (
                    <Tooltip title={`Followers: ${followersCount}`} arrow>
                        <StyledIconButton onClick={handleFollowToggle} followed={followed}>
                            <FavoriteIcon />
                        </StyledIconButton>
                    </Tooltip>
                )}
            </CardActions>
            <Dialog open={confirmDialogOpen} onClose={handleCancelDelete}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default VacationCard;
