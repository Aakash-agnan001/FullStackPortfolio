import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const UpdateForm = () => {
    const { user } = useAuthContext()
    const { dispatch } = useWorkoutsContext()

    const [id, setID] = useState('')
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        if (!user) {
            return
        }
        e.preventDefault()

        const workout = { id, title, load, reps }

        const response = await fetch('/api/workouts/' + workout.id, {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } else {
            setID('')
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('Workout Updated', json)
            dispatch({ type: "UPDATE_WORKOUT", payload: json })
        }
    }

    return (
        <form className="update" onSubmit={handleSubmit}>
            <h3>Update a Workout</h3>

            <label>Excersize ID</label>
            <input type='text' onChange={(e) => setID(e.target.value)} value={id} className={emptyFields.includes('id') ? 'error' : ''} />

            <label>Excersize Title</label>
            <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} className={emptyFields.includes('title') ? 'error' : ''} />

            <label>Load (in Pounds)</label>
            <input type='number' onChange={(e) => setLoad(e.target.value)} value={load} className={emptyFields.includes('load') ? 'error' : ''} />

            <label>Reps</label>
            <input type='number' onChange={(e) => setReps(e.target.value)} value={reps} className={emptyFields.includes('reps') ? 'error' : ''} />

            <button>Update Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default UpdateForm