'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Photo = require('./photo.js');
const gallerySchema = Schema({
  author: {type: String, required: true},
  title: {type: String, required: true},
  year: {type: String, required: true},
  dateCreated: {type: Date, default: Date.now},
  photo: [{type: Schema.Types.ObjectId, ref: 'photo'}],
});

const Gallery = module.exports = mongoose.model('gallery', gallerySchema);

Gallery.findByIdAndAddPhoto = function(id, photo) {
  return Gallery.findById(id)
  .then(gallery => {
    console.log('gallery', gallery);
    photo.galleryId = gallery._id;
    this.tempGallery = gallery;
    return new Photo(photo).save();
  })
  .then(photo => {
    this.tempGallery.photo.push(photo._id);
    this.tempPhoto = photo;
    return this.tempGallery.save();
  })
  .then((gallery) => console.log(gallery.photo))
  .then(() => {
    console.log('temp photo', this.tempPhoto);
    return this.tempPhoto;
  });
};

Gallery.findGalleryAndPhoto = function(galleryId, photoId) {
  return Gallery.findById(photoId)
  .populate('photos')
  .then(gallery => {
    this.tempGallery = gallery;
    return this.tempGallery.save();
  })
  .then(photo => {
    this.tempPhoto = photo;
    return Gallery.findById(photoId);
  })
  .then(() => {
    return this.tempPhoto;
  });
};
