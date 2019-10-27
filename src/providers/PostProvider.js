import React from 'react'
import { firestore } from '../firebase'

const collectIdsandDocs = doc => {
    return { id: doc.id, ...doc.data() }
}
export const PostsContext = React.createContext()
function PostProvider({ children }) {
    const [posts, setPosts] = React.useState([])
    const [sections, setSections] = React.useState([])

    React.useEffect(() => {

        const subscribeF = firestore.collection('posts').orderBy("createdAt", "desc")
            .limit(100).onSnapshot(snapshot => {
                const newPosts = snapshot.docs.map(collectIdsandDocs)
                setPosts(newPosts)


            })

        return () => { subscribeF() }
    }, [])
    // const foods = posts.reduce((acc, cur) => {
    //     if (!acc[cur.section]) {
    //         acc[cur.section] = [];
    //     }
    //     acc[cur.section].push(cur);
    //     return acc;
    // }, {});
    // setSections(foods)

    // console.log(sections)
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
