import multer from "multer";


const MYME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function(req, file, callBack) {
        const isValid = MYME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid file type");
        if (isValid) {
            error = null;
        }
        callBack(error, './src/images')
    },
    filename: function (req, file, callBack) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MYME_TYPE_MAP[file.mimetype];
        callBack(null, name + '-' + Date.now() + '.' + ext);
    }
});


export const upload = multer({storage});