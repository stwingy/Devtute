import React, { useState } from 'react';

import { auth, firestore, storage } from '../../firebase';
import { Button } from '../../style/styles';
import styled from 'styled-components';
const StyledInput = styled.input`
	border: 1px solid #000;
	border-radius: 10px;
	padding: 10px;
	margin: 5px;
	width: 200px;
	box-sizing: border-box;
	background: ${(prop) => (prop.correct ? 'white' : 'red')};
`;
function UserProfile() {
	const [ displayName, setDisplayName ] = useState('');
	const [ imageInput, setImageInput ] = useState(null);

	const uid = () => {
		return auth.currentUser.uid;
	};

	const userRef = () => {
		return firestore.collection('users').doc(uid());
	};
	const file = () => {
		return imageInput && imageInput.files[0];
	};

	const handleChange = (event) => {
		setDisplayName(event.target.value);
	};

	const handleSubmit = (event) => {
		//event.preventDefault();

		if (displayName) {
			userRef().update({ displayName });
		}
		if (file) {
			storage
				.ref()
				.child('user-profiles')
				.child(uid())
				.child(file().name)
				.put(file())
				.then((response) => response.ref.getDownloadURL())
				.then((photoURL) => userRef().update({ photoURL }));
		}
	};

	return (
		<section className="UserProfile">
			<form onSubmit={handleSubmit} className="UpdateUser">
				<StyledInput
					type="text"
					name="displayName"
					value={displayName}
					placeholder="Display Name"
					onChange={handleChange}
				/>
				<StyledInput type="file" ref={(ref) => setImageInput(ref)} />
				<Button className="update" type="submit" onClick={handleSubmit}>
					Submit
				</Button>
			</form>
		</section>
	);
}

export default UserProfile;
