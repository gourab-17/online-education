import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, useTheme } from '@mui/material';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';

const CardElement = ({ courseTitle, description, category, location, id }) => {
    const { palette } = useTheme();
    const { userInfo } = useSelector(state => state.signIn);

    return (
        <Card sx={{ minWidth: 275, mb: 3, mt: 3, bgcolor: palette.primary.white }}>
            <CardContent>
                <Typography sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }} gutterBottom>
                    <IconButton><PlayLessonIcon sx={{ color: palette.secondary.main, fontSize: 18 }} /></IconButton> {`a short guide on the ${courseTitle}`}
                </Typography>
                <Typography variant="h5" component="div">
                    {courseTitle}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {category}
                </Typography>
                <Typography variant="body2">
                    Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
                </Typography>
            </CardContent>
            <CardActions>
                {!userInfo ? (
                    <Button disableElevation variant='contained' size="small" startIcon={<AddIcon />}>
                        <Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }} to="/login">
                            Watch Guide
                        </Link>
                    </Button>
                ) : (
                    <Button disableElevation variant='contained' size="small" startIcon={<AddIcon />}>
                        <Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }} to={`/course/${id}`}>
                            Watch Guide
                        </Link>
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default CardElement;
