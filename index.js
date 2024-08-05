const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (resquest, response) => {

    return response.json(users)
})

app.post('/users', (resquest, response) => {
    const { name, age } = resquest.body

    const user = { id:uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (resquest, response) => {
    const { name, age } = resquest.body
    const index = resquest.userIndex
    const id = resquest.userId

    const updatedUser = {id, name, age }

    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (resquest, response) => {
    const index = resquest.userIndex
    
    users.splice(index,1)

    return response.status(204).json()
})

app.listen(3000, () => {
    console.log(`🚀 Server started no port ${port}`)
})