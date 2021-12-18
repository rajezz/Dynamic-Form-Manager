export default function ProfileSection({ name, onLogout }: any) {
	return (
		<div className="profile-section">
			<p>Welcome,</p>
			<p>
				<strong>{name}</strong>
			</p>
			<a onClick={onLogout}>Logout</a>
		</div>
	)
}
