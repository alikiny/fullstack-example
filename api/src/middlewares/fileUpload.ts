import multer from 'multer'

export const singleUpload = multer().single('image')
export const multiUpload = multer().array('image')
