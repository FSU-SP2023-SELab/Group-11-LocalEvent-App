 //code handles the use (clicking) of the like button
        //but the post is changing after being liked
        
        /*
        *
        *
        *   Code Below broke the Program. It complained that there too many 
        *   Re-Renders. Maybe we can hold this in a non-useState array?
        *   Or maybe do a useEffect in order to have that be rendered POST
        *   Page renders?
        * 
        * 
        */

        // const [isLiked, setIsLiked] = useState(likeStatus[d.id]);
        // const handlePress = () => {
        //     const updatedLikeStatus = [...likeStatus];
        //     updatedLikeStatus[d.id] = !isLiked;
        //     setLikeStatus(updatedLikeStatus);
        //     setIsLiked(!isLiked);
        // };  

        {/* <TouchableOpacity onPress={handlePress} key={i}>
            <Icon name={likeStatus[d.id] ? 'heart' : 'heart-o'} size={24} color={likeStatus[d.id] ? 'red' : 'black'} />
        </TouchableOpacity> */}