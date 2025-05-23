
export default {
	app: {
		auth: {
			forgetPassword: {
				page: {
					title: "Forgot Password",
					description: "Enter your email address and we'll send you a link to reset your password.",
					error: {
						email: "Please enter a valid email address",
					},
					form: {
						email: {
							label: "Email Address",
							placeholder: "m@example.com",
						},
					},
					link: {
						login: "Login",
					},
					button: {
						submit: "Send the link",
					},
					toast: {
						success : "Link sent successfully!"
					},
				},
			},
			resetPassword: {
				page: {
					title: "Change your password",
					description: "Enter your information to change your password.",
					error: {
						password: "The password must be at least 6 characters long",
						passwordMatch: "Passwords do not match",
					},
					form: {
						password: {
							label: "New password",
							placeholder: "New password",
						},
						confirmPassword: {
							label: "Confirm new password",
							placeholder: "New password",
						},
					},
					button: {
						submit: "Change",
					},
					toast: {
						success: "Password successfully changed!",
					},
				},
			},
			login: {
				page:{
					title: "Sign In",
					description: "Enter your email below to login to your account",
					error: {
						email: "Please enter a valid email address",
						password: "Password must be at least 6 characters",
					},
					form: {
						email: {
							label: "Email Address",
							placeholder: "m@example.com",
						},
						password: {
							label: "Password",
							placeholder: "password",
						},
					},
					link: {
						forgotPassword: "Forgot your password?",
						register: "Sign Up",
					},
					button: {
						submit: "Login",
						google: "Sign in with Google",
						github: "Sign in with Github",
					},
				},
			},
			register: {
				page: {
					title: "Sign Up",
					description: "Enter your information to create an account",
					error: {
						email: "Please enter a valid email address",
						password: "Password must be at least 6 characters",
						passwordMatch: "Passwords do not match",
					},
					form: {
						firstName: {
							label: "First name",
							placeholder: "Max",
						},
						lastName: {
							label: "Last name",
							placeholder: "Robinson",
						},
						email: {
							label: "Email Address",
							placeholder: "m@example.com"
						},
						password: {
							label: "Password",
							placeholder: "Password",
						},
						confirmPassword: {
							label: "Confirm Password",
							placeholder: "Confirm Password",
						},
						image: {
							label: "Profile Image (optional)",
						},
					},
					button: {
						submit: "Create an account",
					},
					link: {
						login: "Sign In",
					},
				},
			},
		},
		dashboard: {
			page: {
				title: "Welcome to your dashboard!",
			},
			settings: {
				components: {
					appearance: {
						title: "Appearance",
						description: "Choose your preferred language, color, and theme.",
						form: {
							language: {
								label: "Language",
								description: "Choose the language you want to use in the dashboard.",
							},
							darkMode: {
								label: "Theme",
								description: "Choose the theme you want to use in the dashboard.",
							},
							themeColor: {
								label: "Color",
								description: "Choose the color you want to use in the dashboard.",
							},
						}
					},
					account: {
						title: "Account",
						description: "Update your account settings.",
						form: {
							changePassword: {
								label: "Change my password",
								description: "An email will be sent to you. Click the link in the email to set a new password.",
								confirmTitle: "Confirm sending the password reset email",
								confirmDescription: "A reset link will be sent to your email address. This action is irreversible. Do you want to proceed?",
							},
							name: {
								label: "Name",
								placeholder: "Max Robinson",
							},
							email: {
								label: "Email Address",
								placeholder: "m@exemple.com",
							},
							image: {
								label: "Profile Image",
							},
						},
						error: {
							email: "Please enter a valid email address",
						},
						button: {
							update: "Update",
							cancel: "Cancel",
							continue: "Continue",
						},
						link: {
							changePassword: "Send password reset email",
						},
						toast: {
							emailSuccess: "Email address updated successfully!",
  							nameOrImageSuccess: "Name and/or image updated successfully!",
						},
					},
				},
				page: {
					items: {
						account: {
							title: "Account",
						},
						appearance: {
							title: "Appearance",
						},
					},
				},
				layout: {
					title: "Settings",
					description: "Manage your account settings and preferences.",
				},
			},
		},
	},
	components: {
		appSideBar: {
			navMain: {
				title: "My budget",
				items: {
					budget: {
						name: "Distribution",
					},
					subscription: {
						name: "Subscription",
					},
				},
			},
		},
		navUser: {
			setting: "Settings",
			logOut: "Logout",
		},
		utils: {
			selectLang: {
				select: "Select a language",
				fr: "French",
				en: "English",
			},
			themeColor: {
				placeholder: "Choose the color",
				color:{
					default: "Default",
					red: "Red",
					rose: "Rose",
					orange: "Orange",
					green: "Green",
					blue: "Blue",
					yellow: "Yellow",
					violet: "Violet",
				},
			},
		},
	},
	BASE_ERROR_CODES: {
		VALIDATION_ERROR: "Validation error.",
		USER_NOT_FOUND: "User not found.",
		FAILED_TO_CREATE_USER: "Failed to create user.",
		FAILED_TO_CREATE_SESSION: "Failed to create session.",
		FAILED_TO_UPDATE_USER: "Failed to update user.",
		FAILED_TO_GET_SESSION: "Failed to retrieve session.",
		INVALID_PASSWORD: "Invalid password.",
		INVALID_EMAIL: "Invalid email address.",
		INVALID_EMAIL_OR_PASSWORD: "Incorrect email or password.",
		SOCIAL_ACCOUNT_ALREADY_LINKED: "This social account is already linked to a user.",
		PROVIDER_NOT_FOUND: "Provider not found.",
		INVALID_TOKEN: "Invalid token.",
		ID_TOKEN_NOT_SUPPORTED: "ID token not supported.",
		FAILED_TO_GET_USER_INFO: "Failed to retrieve user information.",
		USER_EMAIL_NOT_FOUND: "User email address not found.",
		EMAIL_NOT_VERIFIED: "Email address not verified.",
		PASSWORD_TOO_SHORT: "Password is too short.",
		PASSWORD_TOO_LONG: "Password is too long.",
		USER_ALREADY_EXISTS: "User already exists.",
		EMAIL_CAN_NOT_BE_UPDATED: "Email address cannot be updated.",
		CREDENTIAL_ACCOUNT_NOT_FOUND: "Credential account not found.",
		SESSION_EXPIRED: "Session expired. Please log in again.",
		FAILED_TO_UNLINK_LAST_ACCOUNT: "Cannot unlink the last connected account.",
		ACCOUNT_NOT_FOUND: "Account not found.",
		EMAIL_IS_THE_SAME: "Same Email address.",
		undefined: "An unexpected error has occurred!",
	},
} as const