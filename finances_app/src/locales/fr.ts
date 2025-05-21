
export default {
	app: {
		auth: {
			forgetPassword: {
				page: {
					title: "Mot de passe oublié",
					description: "Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
					error: {
						email: "Veuillez entrer une adresse e-mail valide",
					},
					form: {
						email:{
							label: "E-mail",
							placeholder: "m@exemple.com",
						},
					},
					link: {
						login: "Connexion",
					},
					button: {
						submit: "Envoyer le lien",
					},
					toast: {
						success : "Lien envoyer avec succès !"
					},
				},
			},
			resetPassword: {
				page: {
					title: "Modifier votre mot de passe",
					description: "Entrez vos informations pour modifier votre mot de passe.",
					error: {
						password: "Le mot de passe doit contenir au moins 6 caractères",
						passwordMatch: "Les mots de passe ne correspondent pas",
					},
					form: {
						password: {
							label: "Nouveau mot de passe",
							placeholder: "Nouveau mot de passe",
						},
						confirmPassword: {
							label: "Confirmer le nouveau mot de passe",
							placeholder: "Nouveau mot de passe",
						},
					},
					button: {
						submit: "Modifier",
					},
					toast: {
						success : "Mot de passe modifier avec succès !"
					},
				},
			},
			login: {
				page: {
					title: "Connexion",
					description: "Entrez votre adresse e-mail ci-dessous pour accéder à votre compte",
					error: {
						email: "Veuillez entrer une adresse e-mail valide",
						password: "Le mot de passe doit contenir au moins 6 caractères",
					},
					form: {
						email: {
							label: "E-mail",
							placeholder: "m@exemple.com",
						},
						password: {
							label: "Mot de passe",
							placeholder: "mot de passe",
						},
					},
					link: {
						forgotPassword: "Mot de passe oublié ?",
						register: "Créer un compte",
					},
					button: {
						submit: "Se connecter",
						google: "Se connecter avec Google",
						github: "Se connecter avec Github",
					},
				},
			},
			register: {
				page: {
					title: "Créer un compte",
					description: "Entrez vos informations pour créer un compte",
					error: {
						email: "Veuillez entrer une adresse e-mail valide",
						password: "Le mot de passe doit contenir au moins 6 caractères",
						passwordMatch: "Les mots de passe ne correspondent pas",
					},
					form: {
						firstName: {
							label: "Prénom",
							placeholder: "Max",
						},
						lastName: {
							label: "Nom",
							placeholder: "Robinson",
						},
						email: {
							label: "E-mail",
							placeholder: "m@exemple.com",
						},
						password: {
							label: "Mot de passe",
							placeholder: "Mot de passe",
						},
						confirmPassword: {
							label: "Confirmer le mot de passe",
							placeholder: "Confirmer le mot de passe",
						},
						image: {
							label: "Image de profil (optionnel)",
						},
					},
					button: {
						submit: "Créer un compte",
					},
					link: {
						login: "Connexion",
					},
				},
			},
		},
		dashboard : {
			page: {
				title: "Bienvenu sur votre dashboard !"
			},
			settings: {
				components: {
					appearance: {
						title: "Apparence",
						description: "Choisissez votre langue, couleur et thème préférés.",
						form: {
							language: {
								label: "Langue",
								description: "Choisissez la langue que vous souhaitez utiliser dans le tableau de bord.",
							},
							darkMode: {
								label: "Thème",
								description: "Choisissez le thème que vous souhaitez utiliser dans le tableau de bord.",
							},
							themeColor: {
								label: "Couleur",
								description: "Choisissez la couleur que vous souhaitez utiliser dans le tableau de bord.",
							},
						}
					},
					account: {
						title: "Compte",
						description: "Mettez à jour les paramètres de votre compte.",
					},
				},
				page: {
					items: {
						account: {
							title: "Compte",
						},
						appearance: {
							title: "Apparence",
						},
					},
				},
				layout: {
					title: "Paramètres",
					description: "Gérez les paramètres et les préférences de votre compte.",
				},
			},
		},
	},
	components: {
		appSideBar: {
			navMain: {
				title: "Mon budget",
				items: {
					budget: {
						name: "Répartition",
					},
					subscription: {
						name: "Abonnement",
					},
				},
			},
		},
		navUser: {
			setting: "Paramètres",
			logOut: "Déconnexion"
		},
		utils: {
			selectLang: {
				select: "Choisir une langue",
				fr: "Français",
				en: "Anglais",
			},
			themeColor: {
				placeholder: "Choisissez une couleur",
				color:{
					default: "Défaut",
					red: "Rouge",
					rose: "Rose",
					orange: "Orange",
					green: "Vert",
					blue: "Bleu",
					yellow: "Jaune",
					violet: "Violet",
				},
			},
		},
	},
	BASE_ERROR_CODES: {
		VALIDATION_ERROR: "Erreur de validation.",
		USER_NOT_FOUND: "Utilisateur introuvable.",
		FAILED_TO_CREATE_USER: "Échec de la création de l'utilisateur.",
		FAILED_TO_CREATE_SESSION: "Échec de la création de la session.",
		FAILED_TO_UPDATE_USER: "Échec de la mise à jour de l'utilisateur.",
		FAILED_TO_GET_SESSION: "Échec de la récupération de la session.",
		INVALID_PASSWORD: "Mot de passe invalide.",
		INVALID_EMAIL: "Adresse e-mail invalide.",
		INVALID_EMAIL_OR_PASSWORD: "Adresse e-mail ou mot de passe incorrect.",
		SOCIAL_ACCOUNT_ALREADY_LINKED: "Ce compte social est déjà lié à un utilisateur.",
		PROVIDER_NOT_FOUND: "Fournisseur non trouvé.",
		INVALID_TOKEN: "Jeton invalide.",
		ID_TOKEN_NOT_SUPPORTED: "Jeton d'identité non pris en charge.",
		FAILED_TO_GET_USER_INFO: "Impossible de récupérer les informations de l'utilisateur.",
		USER_EMAIL_NOT_FOUND: "Adresse e-mail de l'utilisateur introuvable.",
		EMAIL_NOT_VERIFIED: "Adresse e-mail non vérifiée.",
		PASSWORD_TOO_SHORT: "Mot de passe trop court.",
		PASSWORD_TOO_LONG: "Mot de passe trop long.",
		USER_ALREADY_EXISTS: "L'utilisateur existe déjà.",
		EMAIL_CAN_NOT_BE_UPDATED: "L'adresse e-mail ne peut pas être modifiée.",
		CREDENTIAL_ACCOUNT_NOT_FOUND: "Compte d'identification introuvable.",
		SESSION_EXPIRED: "Session expirée. Veuillez vous reconnecter.",
		FAILED_TO_UNLINK_LAST_ACCOUNT: "Impossible de dissocier le dernier compte lié.",
		ACCOUNT_NOT_FOUND: "Compte introuvable.",
		undefined: "Une erreur inattendue est survenue !",
	},	
} as const