
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
			budget: {
				layout: {
					title: "Budget",
					description: "Manage the distribution of your expenses visually.",
				},
				page:{

				},
				components: {
					budgetSheet: {
						add: {
							title: "Adding a new budget.",
							description: "You can now easily add your budget.",
						},
						update: {
							title: "Editing your budget.",
							description: "You can now easily edit your budget.",
						},
					},
					budgetChart: {
						delete: {
							title: "Deleting your budget",
							description: "Are you sure you want to delete your budget? This action is irreversible and all associated data will be lost.",
						},
						button: {
							delete: "Delete",
							cancel: "Cancel",
						},
						remainingAmount: {
							positive: "You have {amount} € left to spend or to invest this month.",
							negative: "You have exceeded your budget by {amount} € this month.",
						},
					},
					budgetManage: {
						tabs: {
						incomes: "Incomes",
						expenses: "Expenses",
						},
						title: {
						income: "Incomes",
						expense: "Expenses",
						},
						description: {
						income: "Enter your various income sources.",
						expense: "Enter your various expenses.",
						},
						form: {
						name: {
							label: "Name",
						},
						amount: {
							label: "Amount",
						},
						categoryName: {
							label: "Category name",
						},
						},
						button: {
						addIncome: "Add an income source",
						addExpense: "Add an expense source",
						addCategoryExpense: "Add an expense category",
						discoverBudget: "Discover my budget",
						saveChange: "Save changes",
						}
					},
				},
			},
			subscription: {
				layout: {
					title: "Subscription",
					description: "Manage the distribution of your subscriptions visually.",
				},
				page:{

				},
				components: {
					subscriptionCalendar: {
						title: "Calendar",
						description: "View your subscriptions by date.",
					},
					subscriptionList: {
						title: "Your Subscriptions",
						description: "Manage the distribution of your subscriptions.",
						totalMonthly: "Monthly Total:",
						totalAnnually: "Annual Total:",
						empty: {
							title: "No Subscriptions",
							description: "No subscriptions scheduled for this date.",
						},
						tabs: {
							thisDay: "Day",
							all: "All",
							annually: "Annual",
							monthly: "Monthly",
						},
						badge: {
							annually: "Annual",
							monthly: "Monthly",
						},
						button: {
							add: "Add",
							cancel: "Cancel",
							delete: "Delete",
							confirm: "Confirm"
						},
						delete: {
							title: "Deleting your budget",
							description: "Are you sure you want to delete your budget? This action is irreversible, and all associated data will be lost.",
						},
					},
					subscriptionManage: {
						add: {
							title: "Adding a new subscription.",
							description: "You can now easily add a subscription.",
						},
						update: {
							title: "Editing your subscription.",
							description: "You can now easily edit your subscription.",
						},
						form: {
							name: {
							label: "Name",
							},
							amount: {
							label: "Amount",
							},
							recurrence: {
							label: "Recurrence",
							annually: "Annual",
							monthly: "Monthly",
							},
							executionDate: {
							label: "Execution date",
							},
							icon: {
							label: "Icon",
							},
						},
						button: {
							add: "Add",
							update: "Update",
						},
					},
				},
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
								label: "Change your password",
								description: "Click this button to set a new password.",
								confirmTitle: "Change your password",
								confirmDescription: "Enter your information to change your password.",
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
							changePassword: "Update your password",		
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
			manageMenu: {
				button: {
					menu: "Menu",
					update: "Edit",
					delete: "Delete",
				},
			},
			managePassword: {
				error: {
					password: "The password must be at least 6 characters long",
					passwordMatch: "Passwords do not match",
				},
				form: {
					currentPassword: {
						label: "Current password",
						placeholder: "Current password",
					},
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
			inputIcon: {
				label: "Icon",
				placeholder: "Search icon(s)...",
				noResults: "No matching icon(s).",
			},
		},
	},
	action: {
		subscription: {
			user: {
				badId: "User not authenticated",
			},
			form: {
				validateField: "Validation error. Please correct the fields.",
				id: "Invalid ID!",
				name: "Please enter a valid name",
				amount: "Please enter a valid amount",
				recurrence: "Please enter a valid recurrence",
				executionDate: "Please enter a valid execution date",
				icon: "Please enter a valid icon",
			},
			create: {
				success: "Subscription created successfully!",
				error: "Server error. Unable to create the subscription.",
			},
			update: {
				success: "Subscription updated successfully!",
				error: "Server error. Unable to update the subscription.",
			},
			delete: {
				badId: "Invalid subscription ID.",
				success: "Subscription deleted successfully!",
				error: "Server error. Unable to delete the subscription.",
			},
		},
		budget: {
			user: {
				badId: "User not authenticated",
			},
			form: {
				validateField: "Validation error. Please correct the fields.",
				id: "Invalid ID!",
				name: "Please enter a valid name",
				amount: "Please enter a valid amount",
				categoryName: "Please enter a valid category name",
			},
			create: {
				success: "Budget created successfully!",
				error: "Server error. Unable to create the budget.",
			},
			update: {
				success: "Budget updated successfully!",
				error: "Server error. Unable to update the budget.",
			},
			delete: {
				success: "Budget deleted successfully!",
				error: "Server error. Unable to delete the budget.",
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
	seo: {
		layout: {
			app: {
				title: "MyBudget",
				description: "A modern application for managing your budget.",
				keywords: {
					budget: "Budget",
					expenses: "Expenses",
					incomes: "Incomes",
					investment: "Investment",
					subscription: "Subscriptions",
				},
			},
			forgotPassword: {
				title: "Forgot Password",
				description: "Easily reset your password to securely access your account.",
				keywords: {
					security: "Security",
					password: "Password",
					reset: "Reset",
					account: "Account",
					access: "Login",
				},
			},
			login: {
				title: "Login",
				description: "Log in to your account to easily manage your personal finances.",
				keywords: {
					login: "Login",
					account: "Account",
					secure: "Security",
					authentication: "Authentication",
					access: "Access"
				},
			},
			register: {
				title: "Register",
				description: "Create a free account to start managing your budget effectively.",
				keywords: {
					register: "Register",
					account: "Account",
					create: "Create",
					budget: "Budget",
					start: "Start"
				},
			},
			resetPassword: {
				title: "Reset Password",
				description: "Choose a new password to secure access to your account.",
				keywords: {
					reset: "Reset",
					password: "Password",
					security: "Security",
					account: "Account",
					new: "New password"
				},
			},
			dashboard: {
				title: "Dashboard",
				description: "View and analyze your expenses, incomes, and subscriptions all in one place.",
				keywords: {
					dashboard: "Dashboard",
					budget: "Budget",
					expenses: "Expenses",
					incomes: "Incomes",
					subscriptions: "Subscriptions"
				},
			},
			subscription: {
				title: "Subscriptions",
				description: "Manage all your subscriptions and track their renewal dates easily.",
				keywords: {
					subscription: "Subscriptions",
					manage: "Manage",
					billing: "Billing",
					renewal: "Renewal",
					services: "Services"
				},
			},
			settings: {
				title: "Settings",
				description: "Customize your experience and manage your account preferences.",
				keywords: {
					settings: "Settings",
					preferences: "Preferences",
					account: "Account",
					customization: "Customization",
					security: "Security"
				},
			},
			budget: {
				title: "Budget",
				description: "Track and plan your incomes, expenses, and savings for better financial management.",
				keywords: {
					budget: "Budget",
					expenses: "Expenses",
					incomes: "Incomes",
					savings: "Savings",
					planning: "Planning"
				},
			},
		},
	},
} as const