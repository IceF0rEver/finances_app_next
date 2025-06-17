
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
							label: "Adresse e-mail",
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
							label: "Adresse e-mail",
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
							label: "Adresse e-mail",
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
			budget: {
				layout: {
					title: "Budget",
					description: "Gérez visuellement la répartition de vos dépenses.",
				},
				page:{

				},
				components:{
					budgetSheet: {
						add: {
							title: "Ajout d'un nouveau budget.",
							description: "Vous pouvez désormais ajouter facilement votre budget.",
						},
						update: {
							title: "Modification de votre budget.",
							description: "Vous pouvez désormais modifier facilement votre budget.",
						},
					},
					budgetChart: {
						delete: {
							title: "Suppression de votre budget",
							description: "Êtes-vous sûr de vouloir supprimer votre budget ? Cette action est irréversible et toutes les données associées seront perdues.",
						},
						button: {
							delete: "Supprimer",
							cancel: "Annuler",
						},
						remainingAmount: {
							positive: "Il vous reste {amount} € à dépenser ou à investir ce mois-ci.",
							negative: "Vous avez dépassé votre budget de {amount} € ce mois-ci.",
						},
					},
					budgetManage: {
						tabs: {
							incomes: "Revenus",
							expenses: "Dépenses",
						},
						title:{
							income: "Revenus",
							expense: "Dépenses",
						},
						description:{
							income: "Inscrivez vos différents revenus.",
							expense: "Inscrivez vos différentes dépenses.",
						},
						form:{
							name:{
								label:"Nom",
							},
							amount:{
								label: "Montant",
							},
							categoryName: {
								label: "Nom de la catégorie",
							},

						},
						button: {
							addIncome: "Ajouter une source de revenu",
							addExpense: "Ajouter une source de dépense",
							addCategoryExpense: "Ajouter une catégorie de dépense",
							discoverBudget: "Découvrir mon budget",
            				saveChange: "Sauvegarder les changements",
						}
					},
				},
			},
			subscription: {
				layout: {
					title: "Abonnement",
					description: "Gérez visuellement la répartition de vos abonnements.",
				},
				page:{

				},
				components: {
					subscriptionCalendar: {
						title: "Calendrier",
						description: "Visualisez vos abonnements par date.",
					},
					subscriptionList: {
						title: "Vos abonnements",
						description: "Gérez la répartition de vos abonnements.",
						totalMonthly: "Total mensuel:",
						totalAnnually: "Total annuel:",
						empty: {
							title: "Aucun abonnement",
							description: "Aucun abonnement prévu pour cette date.",
						},
						tabs: {
							thisDay: "Jour",
							all: "Tous",
							annually: "Annuels",
							monthly: "Mensuels"	
						},
						badge: {
							annually: "Annuel",
							monthly: "Mensuel"	
						},
						button: {
							add: "Ajouter",
							cancel: "Annuler",
							delete: "Supprimer",
							confirm: "Confirmer"
						},
						delete: {
							title: "Suppression de votre abonnement",
							description: "Êtes-vous sûr de vouloir supprimer votre abonnement ? Cette action est irréversible et toutes les données associées seront perdues.",
						},
					},
					subscriptionManage: {
						add: {
							title: "Ajout d'un nouvel abonnement.",
							description: "Vous pouvez désormais ajouter facilement un abonnement.",
						},
						update: {
							title: "Modification de votre abonnement.",
							description: "Vous pouvez désormais modifier facilement votre abonnement.",
						},
						form: {
							name: {
								label: "Nom",
							},
							amount: {
								label: "Montant",
							},
							recurrence: {
								label: "Récurrence",
								annually : "Annuel",
               					monthly: "Mensuel",
							},
							executionDate: {
								label: "Date d'éxécution",
							},
							icon: {
								label: "Icône",
							},
						},
						button: {
							add: "Ajouter",
							update: "Modifier",
						},
					},
				},
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
						form: {
							changePassword: {
								label: "Changer votre mot de passe",
  								description: "Cliquez sur ce bouton pour définir un nouveau mot de passe.",
								confirmTitle: "Modifier votre mot de passe",
								confirmDescription: "Entrez vos informations pour modifier votre mot de passe.",
							},
							name: {
								label: "Prénom Nom",
								placeholder: "Max Robinson",
							},
							email: {
								label: "Adresse e-mail",
								placeholder: "m@exemple.com",
							},
							image: {
								label: "Image de profil",
							}
						},
						error: {
							email: "Veuillez entrer une adresse e-mail valide",
						},
						button: {
							update: "Modifier",
							cancel: "Annuler",
							continue: "Continuer",
						},
						link: {
							changePassword: "Modifier votre mot de passe",
						},
						toast: {
							emailSuccess: "Adresse e-mail modifier avec succès !",
							nameOrImageSuccess: "Prénom Nom et/ou image modifier avec succès !",
						},
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
			manageMenu: {
				button: {
					menu: "Menu",
					update: "Modifier",
					delete: "Supprimer",
				},
			},
			managePassword: {
				error: {
					password: "Le mot de passe doit contenir au moins 6 caractères",
					passwordMatch: "Les mots de passe ne correspondent pas",
				},
				form: {
					currentPassword: {
						label: "Mot de passe actuel",
						placeholder: "Mot de passe actuel",
					},
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
			inputIcon: {
				label: "Icône",
				placeholder: "Recherche d'icône(s)...",
				noResults : "Pas d'icône(s) correspondante(s).",
			},
		},
	},
	action: {
		subscription: {
			user: {
				badId: "Utilisateur non authentifié",
			},
			form: {
				validateField: "Erreur de validation. Veuillez corriger les champs.",
				id: "ID invalide !",
				name: "Veuillez entrer un nom valide",
				amount: "Veuillez entrer un montant valide",
				recurrence: "Veuillez entrer une récurrence valide",
				executionDate: "Veuillez entrer une date d'exécution valide",
				icon:"Veuillez entrer une icône valide",
			},
			create: {
				success: "Abonnement créé avec succès !",
				error: "Erreur serveur. Impossible de créer l'abonnement.",
			},
			update: {
				success: "Abonnement modifier avec succès !",
				error: "Erreur serveur. Impossible de modifier l'abonnement.",
			},
			delete: {
				badId: "ID de l'abonnement invalide.",
				success: "Abonnement supprimer avec succès !",
				error: "Erreur serveur. Impossible de supprimer l'abonnement.",
			},
		},
		budget: {
			user: {
				badId: "Utilisateur non authentifié",
			},
			form: {
				validateField: "Erreur de validation. Veuillez corriger les champs.",
				id: "ID invalide !",
				name: "Veuillez entrer un nom valide",
				amount: "Veuillez entrer un montant valide",
				categoryName: "Veuillez entrer un nom de catégorie valide",
			},
			create: {
				success: "Budget créé avec succès !",
				error: "Erreur serveur. Impossible de créer le budget.",
			},
			update: {
				success: "Budget modifier avec succès !",
				error: "Erreur serveur. Impossible de modifier le budget.",
			},
			delete: {
				success: "Budget supprimer avec succès !",
				error: "Erreur serveur. Impossible de supprimer le budget.",
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
		EMAIL_IS_THE_SAME: "Adresse e-mail identique.",
		undefined: "Une erreur inattendue est survenue !",
	},
	seo: {
		layout: {
			app: {
				title: "MyBudget",
				description: "Une application moderne pour la gestion de son budget.",
				keywords: {
					budget: "Budget",
					expenses: "Dépenses",
					incomes: "Revenus",
					investment: "Investissement",
					subscription: "Abonnements",
				},
			},
			forgotPassword: {
				title: "Mot de passe oublié",
				description: "Réinitialisez facilement votre mot de passe pour accéder à votre compte en toute sécurité.",
				keywords: {
					security: "Sécurité",
					password: "Mot de passe",
					reset: "Réinitialisation",
					account: "Compte",
					access: "Connexion",
				},
			},
			login: {
				title: "Connexion",
				description: "Connectez-vous à votre compte pour gérer facilement vos finances personnelles.",
				keywords: {
					login: "Connexion",
					account: "Compte",
					secure: "Sécurité",
					authentication: "Authentification",
					access: "Accès"
				},
			},
			register: {
				title: "Inscription",
				description: "Créez un compte gratuitement pour commencer à gérer votre budget efficacement.",
				keywords: {
					register: "Inscription",
					account: "Compte",
					create: "Créer",
					budget: "Budget",
					start: "Commencer"
				},
			},
			resetPassword: {
				title: "Réinitialiser le mot de passe",
				description: "Choisissez un nouveau mot de passe pour sécuriser l’accès à votre compte.",
				keywords: {
					reset: "Réinitialisation",
					password: "Mot de passe",
					security: "Sécurité",
					account: "Compte",
					new: "Nouveau mot de passe"
				},
			},
			dashboard: {
				title: "Tableau de bord",
				description: "Visualisez et analysez vos dépenses, revenus et abonnements en un seul endroit.",
				keywords: {
					dashboard: "Tableau de bord",
					budget: "Budget",
					expenses: "Dépenses",
					incomes: "Revenus",
					subscriptions: "Abonnements"
				},
			},
			subscription: {
				title: "Abonnements",
				description: "Gérez tous vos abonnements et suivez leurs échéances facilement.",
				keywords: {
					subscription: "Abonnements",
					manage: "Gérer",
					billing: "Facturation",
					renewal: "Renouvellement",
					services: "Services"
				},
			},
			settings: {
				title: "Paramètres",
				description: "Personnalisez votre expérience et gérez les préférences de votre compte.",
				keywords: {
					settings: "Paramètres",
					preferences: "Préférences",
					account: "Compte",
					customization: "Personnalisation",
					security: "Sécurité"
				},
			},
			budget: {
				title: "Budget",
				description: "Suivez et planifiez vos revenus, dépenses et économies pour une meilleure gestion financière.",
				keywords: {
					budget: "Budget",
					expenses: "Dépenses",
					incomes: "Revenus",
					savings: "Économies",
					planning: "Planification"
				},
			},
		},
	},
} as const