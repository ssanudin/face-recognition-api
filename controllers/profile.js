const handleProfile = (db) => (req, res) => {
  const { id } = req.params;

  db.select('*').from('users').where({id})
    .then(user => {
      if( user.length ) {
        res.json(user[0])
      } else {
        res.json('Not Found')
      }
    })
    .catch(err => res.status(400).json('Error getting user'));
}

module.exports = {
  handleProfile: handleProfile
}