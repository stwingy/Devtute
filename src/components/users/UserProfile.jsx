import React, { useState } from 'react';
import { auth, firestore, storage } from '../../firebase';
import { puts } from 'util';

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
		event.preventDefault();

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
				<input
					type="text"
					name="displayName"
					value={displayName}
					placeholder="Display Name"
					onChange={handleChange}
				/>
				<input type="file" ref={(ref) => setImageInput(ref)} />
				<input className="update" type="submit" />
			</form>
		</section>
	);
}

export default UserProfile;
