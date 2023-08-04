import path from "path"
import multer from "multer"

const storage = multer.diskStorage({
    destination: `${path.dirname(path.basename(__dirname))}/images`,
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})

const uploadImage = multer({storage}).single('photo')

export default uploadImage