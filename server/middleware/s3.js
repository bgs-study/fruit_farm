import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

import { s3 } from '../config/config.js';

const s3set = new aws.S3({
	accessKeyId: s3.accessKeyId,
	secretAccessKey: s3.secretAccessKey,
	region: s3.region,
});

export const upload = multer({
	storage: multerS3({
		s3: s3set,
		bucket: 'nadoddam',
		acl: 'public-read',
		contentType: multerS3.AUTO_CONTENTTYPE,
		key: function (req, file, cb) {
			cb(null, `${Date.now()}${file.originalname}`);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
});
