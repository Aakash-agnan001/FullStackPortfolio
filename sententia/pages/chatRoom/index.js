import styles from '../../styles/chatRoom.module.css'
import Navbarmain from '../../comps/Navbarmain.js'
import Footer from '../../comps/Footer.js'

// import firebase from '../../firebase/clientApp'
import firebase from '../../firebase/clientApp'
import { collection, getDocs } from "firebase/firestore";
import react, { useState, useEffect } from 'react'
import 'firebase/firestore';
import { getFirestore as fgetFirestore } from '@firebase/firestore'


// import { collection as fcollection } from "@firebase/firestore";
import { query as fireQuery } from '@firebase/firestore';
import { limit as flimit } from '@firebase/firestore';
import { getDocs as fireGetDocs } from '@firebase/firestore';
import 'firebase/firestore';





export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()

    return {
        props: {
            chatroom: data
        }
    }
}

const chatRoom = ({ chatroom }) => {

    const [posts, setPosts] = useState([])
    const db = fgetFirestore(firebase.app())

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        console.log(posts)
    }, [posts])

    async function getPosts() {
        const postsCollectionRef = db.collection('posts')
        await fireGetDocs(postsCollectionRef).then(response => {
            const pos = response.docs.map(doc => ({ data: doc.data(), id: doc.id }))
            setPosts(pos)
        }).catch(error => console.log(error.message))
    }

    return (
        <div>
            <Navbarmain />
            <div>
                <h1 className={styles.header}>Chat Room</h1>
                <div className={styles.allText}>
                    <a>
                        {posts.map(postf => <h3 key={postf.id} className={styles.text}>{postf.data.post}</h3>)}
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
}
// {
//     chatroom.map(chats => (
//         <div className={styles.allText} key={chats.id}>
//             <a>
//                 <h3 className={styles.text}>{chats.body}</h3>
//             </a>
//         </div>
//     ))
// }


export default chatRoom;