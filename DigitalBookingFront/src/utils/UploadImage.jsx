import React, { useState } from "react";
import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const S3_BUCKET = "g2c5-frontnode";
const REGION = "us-east-2";
const key_aws = "AKIASDYGBXDR5Q3YQQHJ";
const secret_aws = "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";

const client = new S3Client({
	region: REGION,
	credentials: {
		accessKeyId: key_aws,
		secretAccessKey: secret_aws,
	},
});

const UploadImage = ({ setImageUrl }) => {
	const [progress, setProgress] = useState(0);
	const [selectedFile, setSelectedFile] = useState(null);
	const [uploadDone, setUploadDone] = useState(false);

	const handleFileInput = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const truncate_url = (url) => {
		let jpgIndex = url.indexOf(".jpg");
		let truncatedUrl = url.substring(0, jpgIndex + 4);

		return truncatedUrl;
	};

	const uploadFile = async (file) => {
		const params = {
			ACL: "public-read",
			Body: file,
			Bucket: S3_BUCKET,
			Key: file.name,
		};

		try {
			const response = await client.send(new PutObjectCommand(params));
			setProgress(100);

			const getObjectParams = {
				Bucket: S3_BUCKET,
				Key: file.name,
			};

			const url = await getSignedUrl(
				client,
				new GetObjectCommand(getObjectParams)
			);
			setImageUrl([truncate_url(url), true]);
			setUploadDone(true);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<div className="d-flex">
				<Form.Group className="mb-3 input text-center">
					<Form.Text>Progreso en la carga de la imagen: {progress}%</Form.Text>
					<Form.Control type="file" onChange={handleFileInput} />
				</Form.Group>
				<Button
					className={`btn-general ms-2 align-self-center" ${
						uploadDone && "disabled"
					}`}
					style={{ alignSelf: "center" }}
					onClick={() => uploadFile(selectedFile)}
				>
					Subir
				</Button>
				<hr />
			</div>
		</div>
	);
};

export default UploadImage;
