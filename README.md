# Plan for Social Feed

## Functional Requirements

1. User is able to create a text post. No media
2. User is able to comment on a post. No replies on comments
3. User is able to like a post
4. Users can follow each other
5. User cannot like twice
6. When user logs in, they can see posts by people they followed

## Entities

Posts
- id - pkey
- content
- authorId - index
- created_at 
- like_count

Likes

- id - pkey
- postId - index
- userId

Unique(postId, userId)

Comments

- id - pkey
- postId - index
- content
- authorId
- created_at

UserFollowings
- id - pkey
- userId - index
- followingUserId

Unique(userId, followingUserId)

## FE

1. Build a simple login page which takes the email of the user and attaches it as x-user-id header for subsequent requests. 
2. Any call to any endpoint without the x-user-id header should redirect to login
3. After login, Home page should show latest 10 posts by the user's following list.
4. Each post component should have a like button, a comment button which on click opens a comments modal with all comments of the post and text box with a "Comment" (Submit) button.
5. a user can follow another user by clicking the follow button next to a user's post.

## BE
 APIs - The user id will always be extracted from header x-user-id
 1. POST /posts  - Create a post. 
 Body - {
    content: string
 }
 Response - Success -> Redirect to /feed, Error -> Show error
 2. GET /posts/feed - Fetches 10 latest posts from user's following list.
 3. GET /users - Displays list of all users
 4. POST /users/:userId/follow - Follow the user with userId
 {
    path param userId -> Create a row in UserFollowings if not exists. If already following return response "You already follow this user"
 }
 5. POST /posts/like - Like a post
 {
    postId: number
 } -> Create a row in likes table. If already liked do nothing. For the post increment like_count by 1.
 6. POST /posts/comment - Comment on a post
 {
    comment: string
 }
 Create a row in comments table. 
 7. GET /posts/:postId/comments
    Return a list of comments for the post