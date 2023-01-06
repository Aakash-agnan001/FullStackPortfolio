import React, { useState } from 'react'
import { getFirestore } from 'firebase/firestore'

export default function addPost() {
    const [cin, setCin] = useState('')

    return (
        <div className={styles.all}>
            <form>
                <input className={styles.inp} type='text' value={post} id='post' onChange={e => setCin(e.target.value)} />
                <button className={styles.btn} type='submit'>Add Post</button>
            </form>
        </div>
    )
}