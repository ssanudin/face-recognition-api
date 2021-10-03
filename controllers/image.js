const Clarifai     = require('clarifai');

//You must add your own API key here from Clarifai. 'f76196b43bbd45c99b4f3cd8e8b40a8a'
const app = new Clarifai.App({
  apiKey: '2c527405bd064125a4937e86eeae821f'
 });

 const handleApiCall = (req, res) => {
  app.models
    .predict( Clarifai.FACE_DETECT_MODEL, req.body.input )
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'));
 }

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}