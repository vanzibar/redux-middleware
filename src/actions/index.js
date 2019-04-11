import _ from 'lodash';
import jsonplaceholder from "../apis/jsonplaceholder";

export const fetchPosts = () => async dispatch => {
    const response = await jsonplaceholder.get('/posts');
    
    dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (userId) => async dispatch => {
    const response = await jsonplaceholder.get(`/users/${userId}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, "userId"));
    userIds.forEach(id => dispatch(fetchUser(id)));
};