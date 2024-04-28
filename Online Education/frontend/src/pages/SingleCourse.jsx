import LoadingBox from '../component/LoadingBox'
import { Box, Container, Stack, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { courseLoadSingleAction } from '../redux/actions/courseAction';
import { userApplyCourseAction } from '../redux/actions/userAction';

const SingleCourse = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { singleCourse, loading } = useSelector(state => state.singleCourse);
  const { id } = useParams();

  useEffect(() => {
    dispatch(courseLoadSingleAction(id));
  }, [id]);

  const applyForACourse = () => {
    dispatch(
      userApplyCourseAction({
        title: singleCourse && singleCourse.title,
        description: singleCourse && singleCourse.description,
        courseId: id,
      })
    );
  };

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Container sx={{ pt: '30px', flexGrow: 1 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 4, p: 2 }}>
              {loading ? (
                <LoadingBox />
              ) : (
                <Card sx={{ bgcolor: palette.primary.white }}>
                  <CardContent>
                    <Typography variant="h5" component="h3">
                      {singleCourse && singleCourse.title}
                    </Typography>
                    <Typography variant="body2" sx={{ pt: 2 }}>
                      <Box component="span" sx={{ fontWeight: 700 }}>Description</Box>: {singleCourse && singleCourse.description}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Grid container spacing={1}>
                      {singleCourse && singleCourse.videoPath && singleCourse.picturePath && (
                        <Grid item xs={12}>
                          <ReactPlayer
                            url={`http://localhost:9000/assets/${singleCourse.videoPath}`}
                            controls
                            width="100%"
                            height="auto"
                            config={{
                              file: {
                                attributes: {
                                  poster: `http://localhost:9000/assets/${singleCourse.picturePath}`, // Replace with the actual path to your thumbnail image
                                },
                              },
                            }}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                  <CardContent>
                    <Typography variant="body2" sx={{ pt: 2 }}>
                      <Box component="span" sx={{ fontWeight: 700 }}>Theory</Box>: {singleCourse && singleCourse.theory}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
            <Box sx={{ flex: 1, p: 2 }}>
              <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                <Button onClick={applyForACourse} sx={{ fontSize: "13px" }} variant='contained'>Bookmark this Course</Button>
              </Card>
            </Box>
          </Stack>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default SingleCourse;
