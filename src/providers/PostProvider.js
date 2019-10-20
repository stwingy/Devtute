import React from 'react'
import { firestore } from '../firebase'

const collectIdsandDocs = doc => {
    return { id: doc.id, ...doc.data() }
}
export const PostsContext = React.createContext()
function PostProvider({ children }) {
    const [posts, setPosts] = React.useState([])
    console.log(posts)
    React.useEffect(() => {

        const subscribeF = firestore.collection('posts').onSnapshot(snapshot => {
            const newPosts = snapshot.docs.map(collectIdsandDocs)
            setPosts(newPosts)

        })

        return () => { subscribeF() }
    }, [])

    return (
        <PostsContext.Provider value={posts}>
            {children}
        </PostsContext.Provider>
    )
}
export function usePosts() {
    return React.useContext(PostsContext)
}
export default PostProvider
