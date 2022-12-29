import React from 'react';

//에러 3: 이미지 불러와서 미리보기는 되는데 콘솔창에 이미지 경로가 안나옵니다!
// 데모 링크: https://codesandbox.io/s/weathered-monad-ffdf7?file=/src/App.js
// 여기서 코드 그대로 가져왔는데 안됩니다
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import styled from 'styled-components';

const App = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	flex-direction: row;
`;
export default function Img() {
	function getImageFileObject(imageFile) {
		console.log({ onAdd: imageFile.dataUrl });
	}
	function runAfterImageDelete(file) {
		console.log({ onDele: file });
	}
	return (
		<App>
			<div>
				<h4>대표이미지</h4>
				<div>
					<h4>Default Example</h4>
					<ImageUploader
						onFileAdded={(img) => getImageFileObject(img)} // function that runs to confirm that your image actually exists
						onFileRemoved={(img) => runAfterImageDelete(img)} // function runs on once you delete your image
					/>
				</div>
				{/* <div>
					<h4>이미지1</h4>
					<ImageUploader
						onFileAdded={(img) => getImageFileObject(img)} // function that runs to confirm that your image actually exists
						onFileRemoved={(img) => runAfterImageDelete(img)} // function runs on once you delete your image
					/>
				</div>
				<div>
					<h4>이미지2</h4>
					<ImageUploader
						onFileAdded={(img) => getImageFileObject(img)} // function that runs to confirm that your image actually exists
						onFileRemoved={(img) => runAfterImageDelete(img)} // function runs on once you delete your image
					/>
				</div> */}
				{/* <ImageUploader
					// onFileAdded={(img) => getImageFileObject(img)}
					// onFileRemoved={(img) => runAfterImageDelete(img)}}
					style={{ height: 200, width: 200, background: 'rgb(0 182 255)' }}
					deleteIcon={
						<img
							src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"
							alt=""
						/>
					}
					uploadIcon={
						<svg
							className="svg-circleplus"
							viewBox="0 0 100 100"
							style={{ height: '40px', stroke: '#000' }}
						>
							<circle
								cx="50"
								cy="50"
								r="45"
								fill="none"
								strokeWidth="7.5"
							></circle>
							<line x1="32.5" y1="50" x2="67.5" y2="50" strokeWidth="5"></line>
							<line x1="50" y1="32.5" x2="50" y2="67.5" strokeWidth="5"></line>
						</svg>
					}
				/>
			</div>
			<div>
				<h4>이미지1</h4>
				<ImageUploader
					style={{ height: 200, width: 200, background: 'rgb(0 182 255)' }}
					deleteIcon={
						<img
							src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"
							alt=""
						/>
					}
					uploadIcon={
						<svg
							className="svg-circleplus"
							viewBox="0 0 100 100"
							style={{ height: '40px', stroke: '#000' }}
						>
							<circle
								cx="50"
								cy="50"
								r="45"
								fill="none"
								strokeWidth="7.5"
							></circle>
							<line x1="32.5" y1="50" x2="67.5" y2="50" strokeWidth="5"></line>
							<line x1="50" y1="32.5" x2="50" y2="67.5" strokeWidth="5"></line>
						</svg>
					}
				/>
			</div>
			<div>
				<h4>이미지2</h4>
				<ImageUploader
					style={{ height: 200, width: 200, background: 'rgb(0 182 255)' }}
					deleteIcon={
						<img
							src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"
							alt=""
						/>
					}
					uploadIcon={
						<svg
							className="svg-circleplus"
							viewBox="0 0 100 100"
							style={{ height: '40px', stroke: '#000' }}
						>
							<circle
								cx="50"
								cy="50"
								r="45"
								fill="none"
								strokeWidth="7.5"
							></circle>
							<line x1="32.5" y1="50" x2="67.5" y2="50" strokeWidth="5"></line>
							<line x1="50" y1="32.5" x2="50" y2="67.5" strokeWidth="5"></line>
						</svg>
					}
				/> */}
			</div>
		</App>
	);
}
