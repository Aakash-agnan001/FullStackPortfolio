import styles from '../../styles/chatRoom.module.css'
import Navbarmain from '../../comps/Navbarmain.js'
import Footer from '../../comps/Footer.js'

import firebase from '../../firebase/clientApp'
import { collection, getDocs, getFirestore, query, limit, addDoc, orderBy, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
import react, { useState, useEffect } from 'react'
import 'firebase/firestore';

import { getAuth, onAuthStateChanged, getToken } from "firebase/auth";

const chatRoom = () => {
    const db = getFirestore()
    const auth = getAuth()

    //display post
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        console.log(posts)
    }, [posts])

    function getPosts() {
        const postsCollectionRef = collection(db, 'posts')
        const q = query(postsCollectionRef, orderBy("createdAt", 'desc'))
        getDocs(q).then(response => {
            const pos = response.docs.map(doc => ({ data: doc.data(), id: doc.id }))
            setPosts(pos)
        }).catch(error => console.log(error.message))
    }

    //Add post
    const [cin, setCin] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        if (cin === '') {
            return
        }
        const postsCollectionRef = collection(db, 'posts')
        if (auth.currentUser) {
            const user = auth.currentUser
            const time = serverTimestamp()
            addDoc(postsCollectionRef, { post: cin, uid: user.uid, createdAt: time }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err.message)
            })
        }

        getPosts()
        setCin('')
    }

    //Delete Post
    function deletePost(postf) {
        if (auth.currentUser) {
            const user = auth.currentUser
            if (user.uid === postf.data.uid) {
                const docRef = doc(db, 'posts', postf.id)
                deleteDoc(docRef).then(() => console.log('Post Deleted')).catch(err => console.log(err.message))
                getPosts()
            }
            else {
                alert("Cannot delete post because you did not create this post.")
            }
        }
    }


    return (
        <div>
            <Navbarmain />
            <div>
                <div className={styles.all}>
                    <form onSubmit={handleSubmit} id="postForm">
                        <input className={styles.inp} type='text' value={cin} id='post' onChange={e => setCin(e.target.value)} />
                        <button className={styles.btn} type='submit'>Add Post</button>
                    </form>
                </div>
                <h1 className={styles.header}>Chat Room</h1>
                <div className={styles.allText}>
                    {posts.map(postf => [
                        <h3 key={postf.id} className={styles.text}>{postf.data.post}</h3>,
                        <div className={styles.center}><button className={styles.dltBtn} key={postf.data.uid} onClick={() => deletePost(postf)}>{"Delete Post"}</button></div>
                    ])}
                </div>
            </div>
        </div>
    );
}


export default chatRoom;