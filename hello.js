const Hello = (app) => {
    app.get('/api/hello', (req, res) => {
        res.send('Test connection!')
    })
    app.get('/api', (req, res) => {
        res.send('Welcome to Urban Uncover')
    })
}

export default Hello;