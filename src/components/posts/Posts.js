import React from 'react'
import Post from './Post'
import { usePosts } from '../../providers/PostProvider'
import { useUser } from '../../providers/UserProvider'
import { firestore } from '../../firebase'
function Posts() {

    const posts = usePosts()
    const user = useUser()
    const { uid, photoURL, email, displayName } = user || {}

    const [title, setTitle] = React.useState("")
    const [body, setBody] = React.useState("")

    function handleSubmit(e) {
        e.preventDefault()
        addPosts({ title: title, body: body, createdAt: Date.now(), stars: 0, user: { uid, photoURL, email, displayName } })

    }
    const addPosts = async post => {
        firestore.collection('posts').add(post)
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={e => setTitle(e.target.value)} />
                <input type="text" onChange={e => setBody(e.target.value)} />
                <button type="submit" >PRESS</button>
            </form>


            {

                (posts.map(p =>
                    <Post key={p.id} id={p.id} title={p.title} body={p.body} createdAt={p.createdAt} stars={p.stars} {...p} postRef={firestore.doc(`posts/${p.id}`)} />
                ))
            }
        </div>
    )
}

export default Posts
// QuerySnapshot properties
// docs  array of DocumentSnapshots
// empty boolean if snapshot empty
// metadata   source etc
// query   ref to query fired
// size number of documents in QuerySnapshot

/*QuerySnapshot methods
docChanges()   array of changes since last snapshot
forEach() iterates over entire array of snapshots
isEqual()    is equal to another snapshot
*/

/* DocumentSnapshot props
id   of document
exists   is in database?
metadata
ref  ref to documents location in database*/

/*DocumentSnapshot methods
data()   gets all the fields of th object
get()    allows access to an objects particular property eg/"firstName"
isEqual()  useful for comparisons
*/