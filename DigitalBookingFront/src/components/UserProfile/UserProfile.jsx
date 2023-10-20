import "./UserProfile.css";
import BackHomeButton from "../BackHomeButton/BackHomeButton";
import PersonalDataForm from "../PersonalDataForm/PersonalDataForm";

const UserProfile = () => {
	return (
		<div className="user-profile-container">
			<div className="user-profile-header">
				<h2>Mi perfil</h2>
				<div className="back-home-button-icon">
					<BackHomeButton isBackIcon={true} />
				</div>
			</div>
			<div className="personal-information-container">
				<PersonalDataForm />
			</div>
		</div>
	);
};
export default UserProfile;
