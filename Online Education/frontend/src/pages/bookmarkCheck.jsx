// ... (imports)

const SingleCourse = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { courseHistory } = useSelector(state => state.user); // Assuming you have a slice of state for user information
  
    useEffect(() => {
      dispatch(courseLoadSingleAction(id));
    }, [id]);
  
    const isCourseBookmarked = courseHistory.some(course => course.courseId === id);
  

  
    return (
      <>
        <Box sx={{ bgcolor: "#fafafa", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <Container sx={{ pt: '30px', flexGrow: 1 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              
              <Box sx={{ flex: 1, p: 2 }}>
                <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                  {isCourseBookmarked ? (
                    <Button disabled sx={{ fontSize: "13px" }} variant='contained'>Bookmark Added</Button>
                  ) : (
                    <Button onClick={applyForACourse} sx={{ fontSize: "13px" }} variant='contained'>Bookmark this Course</Button>
                  )}
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
  